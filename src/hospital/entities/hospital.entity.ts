import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { BaseEntity } from 'src/common/entities'
import { Address } from 'src/address/entities/address.entity'
import { HospitalDoctors } from './hospitalDoctor.entity'

@Entity({ name: 'hospitals' })
export class Hospital extends BaseEntity {
  @Column('float')
  distance: number

  @OneToOne(() => Address, (address) => address.hospital)
  @JoinColumn()
  address: Address

  @OneToMany(
    () => HospitalDoctors,
    (hospitalDoctors) => hospitalDoctors.hospital
  )
  hospitalDoctors: HospitalDoctors
}
