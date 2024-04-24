import { Column, Entity, OneToMany } from 'typeorm'
import { Doctor } from 'src/doctor/entities/doctor.entity'
import { Item } from 'src/common/entities'

@Entity({ name: 'sponsor_levels' })
export class SponsorLevel extends Item {
  @Column('float')
  price: number

  @Column('int')
  duration: number

  @Column('text')
  description: string

  @OneToMany(() => Doctor, (doctor) => doctor.sponsorLevel)
  doctor: Doctor[]
}
