import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Hospital } from './hospital.entity'

@Entity({ name: 'hospital_doctors' })
export class HospitalDoctors {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Doctor, (doctor) => doctor.hospitalDoctors)
  doctor: Doctor[]

  @ManyToOne(() => Hospital, (hospital) => hospital.hospitalDoctors)
  hospital: Hospital[]
}
