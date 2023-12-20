import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Patient } from 'src/patient/entities/patient.entity'
import { BaseEntity } from 'src/common/entities'
import { Country } from './country.entity'

@Entity({ name: 'phone_codes' })
export class PhoneCode extends BaseEntity {
  @Column('varchar', {
    unique: true
  })
  code: string

  @OneToMany(() => Doctor, (doctor) => doctor.phoneCode)
  doctor: Doctor[]

  @OneToMany(() => Patient, (patient) => patient.phoneCode)
  patient: Patient[]

  @OneToOne(() => Country, (country) => country.phoneCode, {
    nullable: false
  })
  country: Country
}
