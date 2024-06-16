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
import { Doctor } from 'src/doctor/entities/doctor.entity'
import { PhoneCode } from 'src/address/entities/phone-code.entity'
import { BaseEntity } from 'src/common/entities'
import { Address } from 'src/address/entities/address.entity'
import { Administrator } from 'src/administrator/entities/administrator.entity'

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
  mobilePhoneNumber?: string

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

  @OneToOne(() => Administrator, (administrator) => administrator.user, {
    nullable: false,
    eager: true
  })
  administrator: Administrator

  @OneToOne(() => Address, (address) => address.user, {
    // nullable: false,
    eager: true
  })
  @JoinColumn()
  address: Address

  @ManyToOne(() => PhoneCode, (phoneCode) => phoneCode.user, {
    eager: true
  })
  regionNumber?: PhoneCode

  private encrpytPassword() {
    this.password = bcrypt.hashSync(this.password, 10)
  }

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim()
    this.encrpytPassword()
  }
}
