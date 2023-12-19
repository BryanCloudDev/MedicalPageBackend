import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Clinic } from './clinic.entity'

@Entity({ name: 'clinic_doctors' })
export class ClinicDoctor {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Doctor, (doctor) => doctor.hospitalDoctors)
  doctor: Doctor[]

  @ManyToOne(() => Clinic, (clinic) => clinic.clinicDoctors)
  clinic: Clinic[]
}
