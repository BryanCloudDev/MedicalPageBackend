import { Column, Entity, OneToOne } from 'typeorm'
import { BaseEntity } from 'src/common/entities'
import { Doctor } from 'src/doctors/entities/doctor.entity'

@Entity({ name: 'sponsor_levels' })
export class SponsorLevel extends BaseEntity {
  @Column('float')
  price: number

  @Column('integer')
  duration: number

  @Column('text')
  description: string

  @OneToOne(() => Doctor, (dcotor) => dcotor.sponsorLevel)
  doctor: Doctor
}
