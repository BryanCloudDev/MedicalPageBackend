import { Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from './baseEntity.entity'
import { Country } from './country.entity'

@Entity({ name: 'states' })
export class State extends BaseEntity {
  @ManyToOne(() => Country, (country) => country.states)
  country: Country
}
