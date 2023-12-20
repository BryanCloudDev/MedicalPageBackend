import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Patient } from 'src/patient/entities/patient.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('integer')
  rating: number

  @Column('text')
  comment: string

  @Column('varchar')
  datePosted: string

  @ManyToOne(() => Doctor, (doctor) => doctor.reviews)
  doctor: Doctor

  @ManyToOne(() => Patient, (patient) => patient.reviews)
  patient: Patient
}
