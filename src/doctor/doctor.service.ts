import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { CreateDoctorDto } from './dto/create-doctor.dto'
import { UpdateDoctorDto } from './dto/update-doctor.dto'
import { Doctor } from './entities/doctor.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { exceptionHandler } from 'src/common/utils'
import { User } from 'src/user/entities/user.entity'
import { Specialty } from 'src/specialty/entities/specialty.entity'
import { FolderType } from 'src/file/enums/folder.enum'
import { FileService } from 'src/file/file.service'
import { UserService } from 'src/user/user.service'
import { PaginationUserDto } from 'src/patient/dto'
import { Roles } from 'src/user/enums'

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly userService: UserService,
    private readonly fileService: FileService
  ) {}

  private readonly logger = new Logger(DoctorService.name)

  async uploadPhoto(file: Express.Multer.File, user: User) {
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
  ) {
    const { jvpmNumber, officePhoneNumber, schedule } = createDoctorDto
    try {
      const doctorInstance = this.doctorRepository.create({
        user,
        jvpmNumber,
        specialty,
        schedule,
        officePhoneNumber
      })

      const doctor = await this.doctorRepository.save(doctorInstance)

      return doctor
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(filterDto: PaginationUserDto) {
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

  async findById(id: string) {
    try {
      const doctor = await this.userService.findById(id)

      return doctor
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  getDoctorProfile(user: User) {
    delete user.patient

    return user
  }

  async updateById(id: string, updateDoctorDto: UpdateDoctorDto) {
    await this.userService.updateById(id, updateDoctorDto)
  }

  async deleteById(id: string) {
    try {
      await this.userService.deleteById(id)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
