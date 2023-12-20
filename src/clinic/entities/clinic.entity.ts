import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Specialty } from 'src/specialty/entities/specialty.entity'
import { Address } from 'src/address/entities/address.entity'
import { ClinicDoctor } from './clinicDoctor.entity'
import { Item } from 'src/common/entities'

@Entity({ name: 'clinics' })
export class Clinic extends Item {
  @OneToOne(() => Address, (address) => address.clinic, {
    nullable: false
  })
  @JoinColumn()
  address: Address

  @ManyToOne(() => Specialty, (specialty) => specialty.clinics, {
    nullable: false
  })
  specialty: Specialty

  @OneToMany(() => ClinicDoctor, (clinicDoctors) => clinicDoctors.doctor)
  clinicDoctors: ClinicDoctor[]
}
