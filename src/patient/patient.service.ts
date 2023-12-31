import { Repository } from 'typeorm'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { Patient } from './entities/patient.entity'

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>
  ) {}
  private readonly logger = new Logger(PatientService.name)

  findAll() {
    return `This action returns all patient`
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`
  }

  async findByEmail(email: string): Promise<Patient> {
    const patient = await this.patientRepository.findOneBy({ email })
    return patient
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return updatePatientDto
  }

  remove(id: number) {
    return `This action removes a #${id} patient`
  }
}
