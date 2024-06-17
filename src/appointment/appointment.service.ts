import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { User } from 'src/user/entities/user.entity'
import { Appointment } from './entities/appointment.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { DoctorService } from 'src/doctor/doctor.service'
import { exceptionHandler, currentDate } from 'src/common/utils'
import { Status, statusTransitions } from './enums/status-appoinment.enum'

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly configService: ConfigService,
    private readonly doctorService: DoctorService
  ) {}

  private readonly logger = new Logger(AppointmentService.name)
  private readonly take = this.configService.get('ENTITIES_LIMIT')
  private readonly skip = this.configService.get('ENTITIES_SKIP')

  async create(createAppointmentDto: CreateAppointmentDto, user: User) {
    try {
      const { patient } = user
      const { doctor } = await this.doctorService.findById(
        createAppointmentDto.doctorId
      )

      const appointmentInstance = this.appointmentRepository.create({
        ...createAppointmentDto,
        patient,
        doctor
      })

      await this.appointmentRepository.save(appointmentInstance)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll({ patient, doctor }: User) {
    try {
      if (patient) {
        const { id } = patient
        const appointments = await this.appointmentRepository.find({
          where: { patient: { id } }
        })

        return appointments
      }

      if (doctor) {
        const { id } = doctor
        const appointments = await this.appointmentRepository.find({
          where: { doctor: { id } }
        })

        return appointments
      }

      const appointments = await this.appointmentRepository.find()

      return appointments
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string) {
    try {
      const appointment = await this.appointmentRepository.findOneBy({ id })

      this.checkIfAppointmentExists(id, appointment)

      if (appointment.deletedOn) {
        throw new BadRequestException(
          `The appointment with id ${id} was deleted`
        )
      }

      return appointment
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private async cancelAppointment(id: string, user: User, statusNotes: string) {
    if (!statusNotes) {
      throw new BadRequestException('Reason for cancelling is required.')
    }

    await this.appointmentRepository.update(id, {
      status: Status.CANCELLED,
      cancelledBy: user.role,
      statusNotes
    })
  }

  private async completeAppointment(id: string, notes: string) {
    if (!notes) {
      throw new BadRequestException('Notes are required')
    }
    await this.appointmentRepository.update(id, {
      status: Status.COMPLETED,
      notes,
      statusNotes: 'Appointment completed'
    })
  }

  private async notAttendedAppointment(id: string) {
    await this.appointmentRepository.update(id, {
      status: Status.NOT_ATTENDED,
      statusNotes: 'Patient did not attend the appointment'
    })
  }

  async updateById(
    id: string,
    user: User,
    { status, statusNotes, appointmentDate, notes }: UpdateAppointmentDto
  ) {
    try {
      // get current status to see if it can be changed to the new status
      const { status: currentStatus } = await this.findById(id)

      const allowedTransitions = statusTransitions[currentStatus]

      if (!allowedTransitions.includes(status)) {
        throw new BadRequestException(
          `Status can not be changed from ${currentStatus} to ${status}`
        )
      }

      if (user.patient) {
        if (status === Status.CANCELLED) {
          await this.cancelAppointment(id, user, statusNotes)
          return
        }
        throw new BadRequestException(
          'Patients can only cancel the appointment, not update it'
        )
      }

      if (user.doctor) {
        if (status === Status.CANCELLED) {
          await this.cancelAppointment(id, user, statusNotes)
          return
        }

        if (status === Status.COMPLETED) {
          await this.completeAppointment(id, notes)
          return
        }

        if (status === Status.NOT_ATTENDED) {
          await this.notAttendedAppointment(id)
          return
        }
      }

      await this.appointmentRepository.update(id, {
        status,
        statusNotes,
        appointmentDate,
        notes
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string) {
    try {
      await this.findById(id)

      await this.appointmentRepository.update(id, {
        deletedOn: currentDate()
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private checkIfAppointmentExists(
    id: string,
    appointment: Appointment | undefined
  ) {
    if (!appointment) {
      throw new NotFoundException(`The appointment with id ${id} was not found`)
    }
  }

  private trasformResponse(appointments: Appointment[]) {
    return appointments
      .filter((appointment) => appointment.deletedOn === null)
      .map((appointment) => {
        delete appointment.deletedOn

        return appointment
      })
  }
}
