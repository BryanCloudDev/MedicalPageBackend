import { Entity, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from 'src/common/entities'
import { Country } from './country.entity'
import { City } from './city.entity'
import { Address } from './address.entity'

@Entity({ name: 'states' })
export class State extends BaseEntity {
  @ManyToOne(() => Country, (country) => country.states)
  country: Country

  @OneToMany(() => City, (city) => city.state)
  cities: City[]

  @OneToMany(() => Address, (address) => address.country)
  address?: Address[]
}
