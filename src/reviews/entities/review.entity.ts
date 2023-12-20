import { Column, Entity, ManyToOne } from 'typeorm'
import { Patient } from 'src/patient/entities/patient.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { BaseEntity } from 'src/common/entities'

@Entity({ name: 'reviews' })
export class Review extends BaseEntity {
  @Column('int')
  rating: number

  @Column('text')
  comment: string

  @ManyToOne(() => Doctor, (doctor) => doctor.reviews, {
    nullable: false
  })
  doctor: Doctor

  @ManyToOne(() => Patient, (patient) => patient.reviews, {
    nullable: false
  })
  patient: Patient
}
