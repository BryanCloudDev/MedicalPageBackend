import { Entity, OneToMany } from 'typeorm'
import { State } from './state.entity'
import { BaseEntity } from './baseEntity.entity'

@Entity({ name: 'countries' })
export class Country extends BaseEntity {
  @OneToMany(() => State, (state) => state.country)
  states: State[]
}
