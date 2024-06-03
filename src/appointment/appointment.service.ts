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

  async findAll(skip = this.skip, take = this.take, deleted = false) {
    try {
      const appointments = await this.appointmentRepository.find({
        skip,
        take
      })

      return deleted ? appointments : this.trasformResponse(appointments)
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

  async updateById(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    try {
      delete updateAppointmentDto.doctorId

      await this.findById(id)

      await this.appointmentRepository.update(id, updateAppointmentDto)
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
