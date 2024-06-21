import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { PatientRepository } from './patient.repository'
import { FolderType } from 'src/file/enums/folder.enum'
import { User } from 'src/user/entities/user.entity'
import { Patient } from './entities/patient.entity'
import { FileService } from 'src/file/file.service'
import { UserService } from 'src/user/user.service'
import { exceptionHandler } from 'src/common/utils'
import { PaginationUserDto } from './dto'
import { Roles } from 'src/user/enums'

@Injectable()
export class PatientService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly userService: UserService,
    private readonly fileService: FileService
  ) {}

  private readonly logger = new Logger(PatientService.name)

  async uploadPhoto(file: Express.Multer.File, user: User): Promise<void> {
    const { id } = user
    try {
      if (!file) throw new BadRequestException('File is required')

      const photo = await this.fileService.uploadFile(FolderType.PATIENT, file)

      await this.userService.updateById(id, {
        photo
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async create(user: User): Promise<Patient> {
    try {
      const patient = this.patientRepository.create(user)

      return patient
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(filterDto: PaginationUserDto): Promise<User[]> {
    try {
      const { offset, limit } = filterDto

      const patients = await this.userService.findAll(
        Roles.PATIENT,
        offset,
        limit
      )

      return patients.map((patient) => this.getPatientProfile(patient))
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const patient = await this.userService.findById(id)

      return patient
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  getPatientProfile(user: User): User {
    delete user.doctor
    delete user.administrator

    return user
  }

  async updateById(
    id: string,
    updatePatientDto: UpdatePatientDto
  ): Promise<void> {
    await this.userService.updateById(id, updatePatientDto)
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.userService.deleteById(id)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
