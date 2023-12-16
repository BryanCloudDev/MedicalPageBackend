import { Column, Entity } from 'typeorm'
import { BaseEntity } from 'src/common/entities'

@Entity({ name: 'sponsor_levels' })
export class SponsorLevel extends BaseEntity {
  @Column('float')
  price: number

  @Column('integer')
  duration: number

  @Column('text')
  description: string
}
