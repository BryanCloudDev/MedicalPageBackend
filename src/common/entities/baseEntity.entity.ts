import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({
    select: false
  })
  createdOn: Date

  @UpdateDateColumn({
    select: false
  })
  updatedOn: Date

  @Column({
    type: 'datetime',
    default: null
  })
  deletedOn: Date
}
