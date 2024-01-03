import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { Appointment } from 'src/appointment/entities/appointment.entity'
import { Review } from 'src/reviews/entities/review.entity'
import { User } from 'src/user/entities/user.entity'
import { BaseEntity } from 'src/common/entities'

@Entity({ name: 'patients' })
export class Patient extends BaseEntity {
  @OneToMany(() => Review, (review) => review.patient)
  reviews: Review[]

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[]

  @OneToOne(() => User, (user) => user.patient, {
    nullable: false
  })
  @JoinColumn()
  user: User
}
