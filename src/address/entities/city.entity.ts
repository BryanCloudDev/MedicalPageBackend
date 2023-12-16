import { Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from 'src/common/entities'
import { State } from './state.entity'

@Entity({ name: 'cities' })
export class City extends BaseEntity {
  @ManyToOne(() => State, (state) => state.cities)
  state: State
}
