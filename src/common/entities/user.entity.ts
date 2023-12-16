import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

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

  @Column('varchar', { nullable: true })
  mobilePhone?: string

  @Column('varchar', { default: 'https://imgur.com/1Vr5Zsj' })
  photo: string

  @Column('varchar')
  birthDate: string

  @Column('varchar')
  createdAt: string

  @Column('varchar')
  lastLogin: string
}
