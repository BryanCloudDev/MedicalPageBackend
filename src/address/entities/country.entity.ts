import { Entity, OneToMany } from 'typeorm'
import { BaseEntity } from 'src/common/entities'
import { Address } from './address.entity'
import { State } from './state.entity'

@Entity({ name: 'countries' })
export class Country extends BaseEntity {
  @OneToMany(() => State, (state) => state.country)
  states: State[]

  @OneToMany(() => Address, (address) => address.country)
  address?: Address[]
}
