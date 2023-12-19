import { Column, Entity, OneToMany } from 'typeorm'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { BaseEntity } from 'src/common/entities'

@Entity({ name: 'sponsor_levels' })
export class SponsorLevel extends BaseEntity {
  @Column('float')
  price: number

  @Column('integer')
  duration: number

  @Column('text')
  description: string

  @OneToMany(() => Doctor, (doctor) => doctor.sponsorLevel)
  doctor: Doctor[]
}
