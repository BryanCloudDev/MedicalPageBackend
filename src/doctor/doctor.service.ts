import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { Specialty } from 'src/specialty/entities/specialty.entity'
import { SpecialtyService } from 'src/specialty/specialty.service'
import { CreateDoctorDto } from './dto/create-doctor.dto'
import { UpdateDoctorDto } from './dto/update-doctor.dto'
import { FolderType } from 'src/file/enums/folder.enum'
import { DoctorRepository } from './doctor.repository'
import { User } from 'src/user/entities/user.entity'
import { exceptionHandler } from 'src/common/utils'
import { FileService } from 'src/file/file.service'
import { UserService } from 'src/user/user.service'
import { PaginationUserDto } from 'src/patient/dto'
import { Doctor } from './entities/doctor.entity'
import { Roles } from 'src/user/enums'

@Injectable()
export class DoctorService {
  constructor(
    private readonly doctorRepository: DoctorRepository,
    private readonly specialtyService: SpecialtyService,
    private readonly userService: UserService,
    private readonly fileService: FileService
  ) {}

  private readonly logger = new Logger(DoctorService.name)

  async uploadPhoto(file: Express.Multer.File, user: User): Promise<void> {
    const { id } = user
    try {
      if (!file) throw new BadRequestException('File is required')

      const photo = await this.fileService.uploadFile(FolderType.DOCTOR, file)

      await this.userService.updateById(id, {
        photo
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async create(
    user: User,
    specialty: Specialty,
    createDoctorDto: CreateDoctorDto
  ): Promise<Doctor> {
    try {
      const doctor = this.doctorRepository.create(
        user,
        specialty,
        createDoctorDto
      )

      return doctor
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(filterDto: PaginationUserDto): Promise<User[]> {
    try {
      const { offset, limit } = filterDto

      const doctors = await this.userService.findAll(
        Roles.DOCTOR,
        offset,
        limit
      )

      return doctors.map((doctor) => this.getDoctorProfile(doctor))
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const doctor = await this.userService.findById(id)

      return doctor
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  getDoctorProfile(user: User): User {
    delete user.patient
    delete user.administrator

    return user
  }

  async updateById(
    id: string,
    {
      specialtyId,
      officePhoneNumber,
      jvpmNumber,
      schedule,
      ...partialUpdateDoctorDto
    }: UpdateDoctorDto
  ): Promise<void> {
    try {
      const [{ doctor }, specialty] = await Promise.all([
        this.findById(id),
        this.specialtyService.findById(specialtyId)
      ])

      await this.userService.updateById(id, partialUpdateDoctorDto)

      await this.doctorRepository.updateByEntity(doctor, {
        officePhoneNumber,
        specialty,
        jvpmNumber,
        schedule
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.userService.deleteById(id)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
