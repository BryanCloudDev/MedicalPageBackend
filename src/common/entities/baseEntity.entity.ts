import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string
}