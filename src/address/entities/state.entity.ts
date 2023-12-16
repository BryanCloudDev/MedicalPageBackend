import { Entity, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './baseEntity.entity'
import { Country } from './country.entity'
import { City } from './city.entity'

@Entity({ name: 'states' })
export class State extends BaseEntity {
  @ManyToOne(() => Country, (country) => country.states)
  country: Country

  @OneToMany(() => City, (city) => city.state)
  cities: City[]
}
