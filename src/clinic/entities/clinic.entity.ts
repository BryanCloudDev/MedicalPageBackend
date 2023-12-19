import { Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Specialty } from 'src/specialty/entities/specialty.entity'
import { Address } from 'src/address/entities/address.entity'
import { ClinicDoctor } from './clinicDoctor.entity'
import { BaseEntity } from 'src/common/entities'

@Entity({ name: 'clinics' })
export class Clinic extends BaseEntity {
  // @Column('float')
  // distance: number

  @OneToOne(() => Address, (address) => address.clinic)
  address: Address

  @ManyToOne(() => Specialty, (specialty) => specialty.clinics)
  specialty: Specialty

  @OneToMany(() => ClinicDoctor, (clinicDoctors) => clinicDoctors.doctor)
  clinicDoctors: ClinicDoctor[]
}
