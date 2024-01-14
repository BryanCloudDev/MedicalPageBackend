import {
  CreateDateColumn,
  DeleteDateColumn,
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

  @DeleteDateColumn({
    select: false
  })
  deletedOn: Date
}
