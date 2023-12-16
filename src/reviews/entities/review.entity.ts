import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Patient } from 'src/patient/entities/patient.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn()
  id: number

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
