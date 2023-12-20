import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Hospital } from 'src/hospital/entities/hospital.entity'
import { Patient } from 'src/patient/entities/patient.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Clinic } from 'src/clinic/entities/clinic.entity'
import { Country } from './country.entity'
import { State } from './state.entity'
import { City } from './city.entity'

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  houseNumber: string

  @Column('varchar')
  streetNumber: string

  @OneToOne(() => Doctor, (doctor) => doctor.address)
  doctor: Doctor

  @OneToOne(() => Patient, (patient) => patient.address)
  patient: Patient

  @OneToOne(() => Hospital, (hospital) => hospital.address)
  hospital: Hospital

  @OneToOne(() => Clinic, (clinic) => clinic.address)
  clinic: Clinic

  @ManyToOne(() => Country, (country) => country.address)
  country: Country

  @ManyToOne(() => City, (city) => city.address)
  city: City

  @ManyToOne(() => State, (state) => state.address)
  state: State
}
