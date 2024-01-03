import { Repository } from 'typeorm'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { Patient } from './entities/patient.entity'
import { FileService } from 'src/file/file.service'
import { FolderType } from 'src/file/enums/folder.enum'

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly fileService: FileService
  ) {}

  private readonly logger = new Logger(PatientService.name)

  async uploadPhoto(photo: Express.Multer.File) {
    await this.fileService.uploadFile(FolderType.PATIENT, photo)
  }

  findAll() {
    return `This action returns all patient`
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return updatePatientDto
  }

  remove(id: number) {
    return `This action removes a #${id} patient`
  }
}
