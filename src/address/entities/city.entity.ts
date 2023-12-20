import { Entity, ManyToOne, OneToMany } from 'typeorm'
import { Item } from 'src/common/entities'
import { Address } from './address.entity'
import { State } from './state.entity'

@Entity({ name: 'cities' })
export class City extends Item {
  @ManyToOne(() => State, (state) => state.cities, {
    nullable: false
  })
  state: State

  @OneToMany(() => Address, (address) => address.city)
  address?: Address[]
}
