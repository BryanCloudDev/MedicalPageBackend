import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { Appointment } from 'src/appointment/entities/appointment.entity'
import { Address } from 'src/address/entities/address.entity'
import { User } from 'src/common/entities'

@Entity({ name: 'patients' })
export class Patient extends User {
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments?: Appointment[]

  @OneToOne(() => Address, (address) => address.doctor)
  @JoinColumn()
  address: Address
}
