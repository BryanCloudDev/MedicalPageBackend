import { BeforeInsert, Column, Entity } from 'typeorm'
import { BaseEntity } from './baseEntity.entity'
import * as bcrypt from 'bcrypt'

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

  @Column('varchar', {
    select: false
  })
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

  encrpytPassword() {
    this.password = bcrypt.hashSync(this.password, 10)
  }

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim()
    this.encrpytPassword()
  }
}
