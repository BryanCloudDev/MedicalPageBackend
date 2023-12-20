import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Patient } from 'src/patient/entities/patient.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'

@Entity({ name: 'appointments' })
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  date: string

  @Column('text', { nullable: true })
  result?: string

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  doctor: Doctor

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient
}
