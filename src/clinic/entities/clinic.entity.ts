import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Specialty } from 'src/specialty/entities/specialty.entity'
import { Address } from 'src/address/entities/address.entity'
import { ClinicDoctor } from './clinicDoctor.entity'
import { BaseEntity } from 'src/common/entities'

@Entity({ name: 'clinics' })
export class Clinic extends BaseEntity {
  @OneToOne(() => Address, (address) => address.clinic)
  @JoinColumn()
  address: Address

  @ManyToOne(() => Specialty, (specialty) => specialty.clinics)
  specialty: Specialty

  @OneToMany(() => ClinicDoctor, (clinicDoctors) => clinicDoctors.doctor)
  clinicDoctors: ClinicDoctor[]
}
