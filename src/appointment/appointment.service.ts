import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as moment from 'moment'
import { Status, statusTransitions } from './enums/status-appoinment.enum'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { exceptionHandler, currentDate } from 'src/common/utils'
import { Appointment } from './entities/appointment.entity'
import { Doctor } from 'src/doctor/entities/doctor.entity'
import { DoctorService } from 'src/doctor/doctor.service'
import { User } from 'src/user/entities/user.entity'
import { TimeSlot } from 'src/common/interfaces'

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

  async create(
    { appointmentDate, doctorId }: CreateAppointmentDto,
    { patient }: User
  ) {
    try {
      const { doctor } = await this.doctorService.findById(doctorId)

      await this.checkIfDoctorHasAppointment(doctor, appointmentDate)

      const appointmentInstance = this.appointmentRepository.create({
        appointmentDate,
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

  private async checkIfDoctorHasAppointment(
    { schedule, id }: Doctor,
    appointmentDate: Date
  ) {
    const dayString = moment(appointmentDate).format('dddd').toLowerCase()

    // check if the doctor works on the selected day
    const scheduleForDoctor = schedule[dayString]

    if (scheduleForDoctor.length === 0) {
      throw new BadRequestException(`The doctor does not work on ${dayString}`)
    }
    // check if the doctor works at the selected time
    const isWithinRange = this.isWithinRange(
      appointmentDate,
      scheduleForDoctor[0]
    )

    if (!isWithinRange) {
      throw new BadRequestException(
        `The doctor does not work at the selected time`
      )
    }

    const foundAppointment = await this.appointmentRepository.findOne({
      where: {
        doctor: { id },
        appointmentDate,
        status: Status.CREATED
      }
    })

    if (foundAppointment) {
      throw new BadRequestException(
        `An appointment exists at the selected time`
      )
    }
  }

  private isWithinRange(date: Date, range: TimeSlot) {
    const time = moment(date).format('HH:mm')
    const startTime = moment(range.start, 'HH:mm')
    const endTime = moment(range.end, 'HH:mm')
    const currentTime = moment(time, 'HH:mm')

    return currentTime.isBetween(startTime, endTime, null, '[)')
  }
}
