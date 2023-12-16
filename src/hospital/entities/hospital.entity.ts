import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { BaseEntity } from 'src/common/entities'
import { Address } from 'src/address/entities/address.entity'

@Entity({ name: 'hospitals' })
export class Hospital extends BaseEntity {
  @Column('float')
  distance: number

  @OneToOne(() => Address, (address) => address.hospital)
  @JoinColumn()
  address: Address
}
