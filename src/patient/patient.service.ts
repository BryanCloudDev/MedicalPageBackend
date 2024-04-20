import { Repository } from 'typeorm'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { FolderType } from 'src/file/enums/folder.enum'
import { User } from 'src/user/entities/user.entity'
import { Patient } from './entities/patient.entity'
import { FileService } from 'src/file/file.service'
import { UserService } from 'src/user/user.service'
import { exceptionHandler } from 'src/common/utils'
import { PaginationUserDto } from './dto'

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly userService: UserService,
    private readonly fileService: FileService
  ) {}

  private readonly logger = new Logger(PatientService.name)

  async uploadPhoto(file: Express.Multer.File, { id }: User) {
    try {
      if (!file) throw new BadRequestException('File is required')

      const photo = await this.fileService.uploadFile(FolderType.PATIENT, file)

      await this.userService.updateById(id, { photo })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async create(user: User) {
    try {
      const patientInstance = this.patientRepository.create({ user })
      const patient = await this.patientRepository.save(patientInstance)

      return patient
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(filterDto: PaginationUserDto) {
    try {
      const { offset, limit, role } = filterDto

      return await this.userService.findAll(role, offset, limit)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string) {
    try {
      const patient = await this.userService.findById(id)

      return patient
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  getPatientProfile(user: User) {
    delete user.doctor
    delete user.patient

    return user
  }

  async updateById(id: string, updatePatientDto: UpdatePatientDto) {
    delete updatePatientDto.photo

    const { ...partialUpdatePatientDto } = updatePatientDto

    await this.userService.updateById(id, partialUpdatePatientDto)
  }

  async deleteById(id: string) {
    try {
      await this.userService.deleteById(id)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
