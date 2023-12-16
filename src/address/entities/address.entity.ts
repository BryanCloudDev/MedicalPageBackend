import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Patient } from 'src/patient/entities/patient.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  houseNumber: string

  @Column('varchar')
  streetNumber: string

  @OneToOne(() => Doctor, (doctor) => doctor.address)
  doctor: Doctor

  @OneToOne(() => Patient, (patient) => patient.address)
  patient: Patient
}