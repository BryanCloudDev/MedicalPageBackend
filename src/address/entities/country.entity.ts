import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { PhoneCode } from './phone-code.entity'
import { Item } from 'src/common/entities'
import { Address } from './address.entity'
import { State } from './state.entity'

@Entity({ name: 'countries' })
export class Country extends Item {
  @OneToMany(() => State, (state) => state.country)
  states: State[]

  @OneToOne(() => PhoneCode, (regionNumber) => regionNumber.country, {
    nullable: true
  })
  @JoinColumn()
  regionNumber: PhoneCode

  @OneToMany(() => Address, (address) => address.country)
  address?: Address[]
}
