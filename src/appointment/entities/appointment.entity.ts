import { Column, Entity, ManyToOne } from 'typeorm'
import { Patient } from 'src/patient/entities/patient.entity'
import { Doctor } from 'src/doctor/entities/doctor.entity'
import { BaseEntity } from 'src/common/entities'
import { Status } from '../enums/status-appoinment.enum'

@Entity({ name: 'appointments' })
export class Appointment extends BaseEntity {
  @Column('datetime')
  appointmentDate: Date

  @Column('text', {
    nullable: true
  })
  notes?: string

  @Column('varchar', {
    default: Status.CREATED
  })
  status?: string

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, {
    nullable: false
  })
  doctor: Doctor

  @Column('varchar', {
    nullable: true
  })
  cancelledBy?: string

  @Column('text', {
    nullable: true
  })
  statusNotes?: string

  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    nullable: false
  })
  patient: Patient
}
