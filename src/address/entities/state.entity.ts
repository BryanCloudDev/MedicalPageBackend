import { Entity, ManyToOne, OneToMany } from 'typeorm'
import { Item } from 'src/common/entities'
import { Country } from './country.entity'
import { Address } from './address.entity'
import { City } from './city.entity'

@Entity({ name: 'states' })
export class State extends Item {
  @ManyToOne(() => Country, (country) => country.states, {
    nullable: false
  })
  country: Country

  @OneToMany(() => City, (city) => city.state)
  cities: City[]

  @OneToMany(() => Address, (address) => address.country)
  address?: Address[]
}
