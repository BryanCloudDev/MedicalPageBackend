import { Column, Entity, OneToMany } from 'typeorm'
import { Appointment } from 'src/appointment/entities/appointment.entity'
import { User } from 'src/common/entities'

@Entity({ name: 'doctors' })
export class Doctor extends User {
  @Column('varchar', { nullable: true })
  phone?: string

  @Column('varchar')
  medicalLicense: string

  @Column('float')
  distance: number

  @Column('bool', {
    default: false
  })
  isSponsor: boolean

  @Column('varchar', { nullable: true })
  startDateSponsor?: string

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments?: Appointment[]
}
