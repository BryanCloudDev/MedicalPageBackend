import { Entity, ManyToOne } from 'typeorm'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { BaseEntity } from 'src/common/entities'
import { Hospital } from './hospital.entity'

@Entity({ name: 'hospital_doctors' })
export class HospitalDoctors extends BaseEntity {
  @ManyToOne(() => Doctor, (doctor) => doctor.hospitalDoctors, {
    nullable: false
  })
  doctor: Doctor

  @ManyToOne(() => Hospital, (hospital) => hospital.hospitalDoctors, {
    nullable: false
  })
  hospital: Hospital
}
