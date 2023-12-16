import { Entity, OneToMany } from 'typeorm'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { BaseEntity } from 'src/common/entities'
import { Clinic } from 'src/clinic/entities/clinic.entity'

@Entity({ name: 'specialties' })
export class Specialty extends BaseEntity {
  @OneToMany(() => Doctor, (doctor) => doctor.specialty)
  doctors: Doctor[]

  @OneToMany(() => Clinic, (clinic) => clinic.specialty)
  clinics: Clinic[]
}
