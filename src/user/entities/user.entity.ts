import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Roles } from '../enums'
import { Patient } from 'src/patient/entities/patient.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { PhoneCode } from 'src/address/entities/phone-code.entity'
import { BaseEntity } from 'src/common/entities'
import { Address } from 'src/address/entities/address.entity'

@Entity({ name: 'users' })
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

  @Column('varchar', {
    nullable: false
  })
  role: Roles

  @Column('bool', {
    default: true
  })
  isActive: boolean

  @OneToOne(() => Patient, (patient) => patient.user, {
    nullable: false,
    eager: true
  })
  patient: Patient

  @OneToOne(() => Doctor, (doctor) => doctor.user, {
    nullable: false,
    eager: true
  })
  doctor: Doctor

  @OneToOne(() => Address, (address) => address.user, {
    nullable: false,
    eager: true
  })
  @JoinColumn()
  address: Address

  @ManyToOne(() => PhoneCode, (phoneCode) => phoneCode.user, {
    eager: true
  })
  phoneCode?: PhoneCode

  private encrpytPassword() {
    this.password = bcrypt.hashSync(this.password, 10)
  }

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim()
    this.encrpytPassword()
  }
}
