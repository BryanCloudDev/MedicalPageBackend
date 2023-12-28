import { Column, Entity } from 'typeorm'
import { BaseEntity } from './baseEntity.entity'

@Entity()
export class User extends BaseEntity {
  @Column('varchar')
  firstName: string

  @Column('varchar')
  lastName: string

  @Column('varchar', {
    unique: true
  })
  email: string

  @Column('varchar')
  password: string

  @Column('varchar', {
    nullable: true
  })
  mobilePhone?: string

  @Column('varchar', {
    default: 'https://imgur.com/1Vr5Zsj',
    nullable: true
  })
  photo: string

  @Column('date')
  birthDate: Date

  @Column('datetime', {
    nullable: true
  })
  lastLoginOn: Date
}
