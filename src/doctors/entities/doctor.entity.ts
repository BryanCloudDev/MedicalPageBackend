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
import { Specialty } from 'src/specialty/entities/specialty.entity'
import { Address } from 'src/address/entities/address.entity'
import { Review } from 'src/reviews/entities/review.entity'
import { User } from 'src/common/entities'

@Entity({ name: 'doctors' })
export class Doctor extends User {
  @Column('integer', { nullable: true })
  phone?: number

  @Column('varchar')
  medicalLicense: string

  @Column('bool', {
    default: false
  })
  isSponsor: boolean

  @Column('varchar', { nullable: true })
  startDateSponsor?: string

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments?: Appointment[]

  @ManyToOne(() => Specialty, (specialty) => specialty.doctors)
  specialty: Specialty

  @OneToOne(() => Address, (address) => address.doctor)
  @JoinColumn()
  address: Address

  @OneToMany(() => HospitalDoctors, (hospitalDoctors) => hospitalDoctors.doctor)
  hospitalDoctors: HospitalDoctors[]

  @OneToMany(() => Review, (review) => review.doctor)
  reviews?: Review[]

  @ManyToOne(() => SponsorLevel, (sponsorLevel) => sponsorLevel.doctor)
  sponsorLevel: SponsorLevel
}
