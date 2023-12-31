import { Repository } from 'typeorm'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Patient } from 'src/patient/entities/patient.entity'

export type UserRepository = Repository<Patient> | Repository<Doctor>
