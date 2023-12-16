import { Column, Entity, ManyToOne, OneToOne } from 'typeorm'
import { BaseEntity } from 'src/common/entities'
import { Address } from 'src/address/entities/address.entity'
import { Specialty } from 'src/specialty/entities/specialty.entity'

@Entity({ name: 'clinics' })
export class Clinic extends BaseEntity {
  @Column('float')
  distance: number

  @OneToOne(() => Address, (address) => address.clinic)
  address: Address

  @ManyToOne(() => Specialty, (specialty) => specialty.clinics)
  specialty: Specialty
}
