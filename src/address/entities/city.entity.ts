import { Entity, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from 'src/common/entities'
import { Address } from './address.entity'
import { State } from './state.entity'

@Entity({ name: 'cities' })
export class City extends BaseEntity {
  @ManyToOne(() => State, (state) => state.cities)
  state: State

  @OneToMany(() => Address, (address) => address.country)
  address?: Address[]
}
