import { Column, Entity } from 'typeorm'
import { BaseEntity } from './baseEntity.entity'

@Entity()
export class Item extends BaseEntity {
  @Column('varchar')
  name: string
}
