import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne
} from 'typeorm'
import { SponsorLevel } from 'src/sponsor-level/entities/sponsor-level.entity'
import { HospitalDoctors } from 'src/hospital/entities/hospitalDoctor.entity'
import { Appointment } from 'src/appointment/entities/appointment.entity'
import { ClinicDoctor } from 'src/clinic/entities/clinicDoctor.entity'
import { Specialty } from 'src/specialty/entities/specialty.entity'
import { Review } from 'src/review/entities/review.entity'
import { User } from 'src/user/entities/user.entity'
import { BaseEntity } from 'src/common/entities'
import { Schedule } from 'src/common/interfaces'

@Entity({ name: 'doctors' })
export class Doctor extends BaseEntity {
  @Column('varchar', {
    nullable: true
  })
  officePhoneNumber?: string

  @Column('varchar')
  jvpmNumber: string

  @Column('bool', {
    default: false
  })
  isSponsor: boolean

  @Column('datetime', {
    nullable: true
  })
  startDateSponsor?: Date

  @OneToOne(() => User, (user) => user.patient, {
    nullable: false
  })
  @JoinColumn()
  user: User

  @Column('json')
  schedule: Schedule

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments?: Appointment[]

  @OneToMany(() => HospitalDoctors, (hospitalDoctors) => hospitalDoctors.doctor)
  hospitalDoctors: HospitalDoctors[]

  @OneToMany(() => ClinicDoctor, (clinicDoctors) => clinicDoctors.doctor)
  clinicDoctors: ClinicDoctor[]

  @OneToMany(() => Review, (review) => review.doctor)
  reviews: Review[]

  @ManyToOne(() => Specialty, (specialty) => specialty.doctors, {
    nullable: false
  })
  specialty: Specialty

  @ManyToOne(() => SponsorLevel, (sponsorLevel) => sponsorLevel.doctor, {
    nullable: true
  })
  sponsorLevel: SponsorLevel
}
