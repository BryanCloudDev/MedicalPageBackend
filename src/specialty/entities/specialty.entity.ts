import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Doctor } from 'src/doctors/entities/doctor.entity'

@Entity({ name: 'specialties' })
export class Specialty {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @OneToMany(() => Doctor, (doctor) => doctor.specialty)
  doctors: Doctor[]
}
