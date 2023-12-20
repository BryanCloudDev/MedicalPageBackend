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
import { PhoneCode } from 'src/address/entities/phone-code.entity'
import { Address } from 'src/address/entities/address.entity'
import { Review } from 'src/reviews/entities/review.entity'
import { User } from 'src/common/entities'

@Entity({ name: 'doctors' })
export class Doctor extends User {
  @Column('varchar', {
    nullable: true
  })
  phone?: string

  @Column('varchar')
  medicalLicense: string

  @Column('bool', {
    default: false
  })
  isSponsor: boolean

  @Column('datetime', {
    nullable: true
  })
  startDateSponsor?: Date

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments?: Appointment[]

  @ManyToOne(() => Specialty, (specialty) => specialty.doctors, {
    nullable: false
  })
  specialty: Specialty

  @OneToOne(() => Address, (address) => address.doctor, {
    nullable: false
  })
  @JoinColumn()
  address: Address

  @OneToMany(() => HospitalDoctors, (hospitalDoctors) => hospitalDoctors.doctor)
  hospitalDoctors: HospitalDoctors[]

  @OneToMany(() => ClinicDoctor, (clinicDoctors) => clinicDoctors.doctor)
  clinicDoctors: ClinicDoctor[]

  @OneToMany(() => Review, (review) => review.doctor)
  reviews: Review[]

  @ManyToOne(() => SponsorLevel, (sponsorLevel) => sponsorLevel.doctor, {
    nullable: false
  })
  sponsorLevel: SponsorLevel

  @ManyToOne(() => PhoneCode, (phoneCode) => phoneCode.doctor)
  phoneCode?: PhoneCode
}
