import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Patient } from './entities/patient.entity'
import { Injectable } from '@nestjs/common'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class PatientRepository {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>
  ) {}

  async create(user: User) {
    const patientInstance = this.patientRepository.create({ user })
    const patient = await this.patientRepository.save(patientInstance)

    return patient
  }
}
