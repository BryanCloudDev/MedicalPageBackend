import { Entity, ManyToOne } from 'typeorm'
import { Doctor } from 'src/doctor/entities/doctor.entity'
import { BaseEntity } from 'src/common/entities'
import { Clinic } from './clinic.entity'

@Entity({ name: 'clinic_doctors' })
export class ClinicDoctor extends BaseEntity {
  @ManyToOne(() => Doctor, (doctor) => doctor.clinicDoctors, {
    nullable: false
  })
  doctor: Doctor

  @ManyToOne(() => Clinic, (clinic) => clinic.clinicDoctors, {
    nullable: false
  })
  clinic: Clinic
}
