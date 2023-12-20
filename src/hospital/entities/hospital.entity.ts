import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { Address } from 'src/address/entities/address.entity'
import { HospitalDoctors } from './hospitalDoctor.entity'
import { Item } from 'src/common/entities'

@Entity({ name: 'hospitals' })
export class Hospital extends Item {
  @OneToOne(() => Address, (address) => address.hospital, {
    nullable: false
  })
  @JoinColumn()
  address: Address

  @OneToMany(
    () => HospitalDoctors,
    (hospitalDoctors) => hospitalDoctors.hospital
  )
  hospitalDoctors: HospitalDoctors[]
}
