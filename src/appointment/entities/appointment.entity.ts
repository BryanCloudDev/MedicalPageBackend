import { Column, Entity, ManyToOne } from 'typeorm'
import { Patient } from 'src/patient/entities/patient.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { BaseEntity } from 'src/common/entities'

@Entity({ name: 'appointments' })
export class Appointment extends BaseEntity {
  @Column('datetime')
  appointmentDate: Date

  @Column('text', {
    nullable: true
  })
  result?: string

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, {
    nullable: false
  })
  doctor: Doctor

  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    nullable: false
  })
  patient: Patient
}
