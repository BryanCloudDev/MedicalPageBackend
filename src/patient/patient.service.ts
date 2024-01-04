import { Repository } from 'typeorm'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { Patient } from './entities/patient.entity'
import { FileService } from 'src/file/file.service'
import { FolderType } from 'src/file/enums/folder.enum'
import { User } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'
import { exceptionHandler } from 'src/common/utils'

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

  findAll() {
    return `This action returns all patient`
  }

  async findOneById(id: string) {
    try {
      const patient = await this.userService.findById(id)

      return patient
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  getPatientProfile(user: User) {
    return this.flatUser(user)
  }

  update(id: string, updatePatientDto: UpdatePatientDto) {
    return updatePatientDto
  }

  async deleteById(id: string) {
    try {
      await this.userService.deleteById(id)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private flatUser(user: User) {
    const { updatedOn, deletedOn, doctor, patient, phoneCode, ...rest } = user

    return { ...rest, phoneCode: phoneCode.code }
  }
}
