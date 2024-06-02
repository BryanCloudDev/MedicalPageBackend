import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Address } from 'src/address/entities/address.entity'
import { HospitalDoctors } from './hospitalDoctor.entity'
import { Item } from 'src/common/entities'
import { Specialty } from 'src/specialty/entities/specialty.entity'

@Entity({ name: 'hospitals' })
export class Hospital extends Item {
  @OneToOne(() => Address, (address) => address.hospital, {
    nullable: false
  })
  @JoinColumn()
  address: Address

  @ManyToOne(() => Specialty, (specialty) => specialty.clinics, {
    nullable: false
  })
  specialty: Specialty

  @OneToMany(
    () => HospitalDoctors,
    (hospitalDoctors) => hospitalDoctors.hospital
  )
  hospitalDoctors: HospitalDoctors[]
}
