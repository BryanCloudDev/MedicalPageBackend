import { Entity, OneToMany } from 'typeorm'
import { Appointment } from 'src/appointment/entities/appointment.entity'
import { User } from 'src/common/entities'

@Entity({ name: 'patients' })
export class Patient extends User {
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments?: Appointment[]
}
