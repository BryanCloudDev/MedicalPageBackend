import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Appointment } from 'src/appointment/entities/appointment.entity'
import { PhoneCode } from 'src/address/entities/phone-code.entity'
import { Address } from 'src/address/entities/address.entity'
import { Review } from 'src/reviews/entities/review.entity'
import { User } from 'src/common/entities'

@Entity({ name: 'patients' })
export class Patient extends User {
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[]

  @OneToOne(() => Address, (address) => address.patient, {
    nullable: false
  })
  @JoinColumn()
  address: Address

  @OneToMany(() => Review, (review) => review.patient)
  reviews: Review[]

  @ManyToOne(() => PhoneCode, (phoneCode) => phoneCode.patient)
  phoneCode?: PhoneCode
}
