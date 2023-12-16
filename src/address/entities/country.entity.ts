import { Entity, OneToMany } from 'typeorm'
import { BaseEntity } from 'src/common/entities'
import { State } from './state.entity'

@Entity({ name: 'countries' })
export class Country extends BaseEntity {
  @OneToMany(() => State, (state) => state.country)
  states: State[]
}
