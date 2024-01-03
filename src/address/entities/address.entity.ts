import { Column, Entity, ManyToOne, OneToOne } from 'typeorm'
import { Hospital } from 'src/hospital/entities/hospital.entity'
import { Clinic } from 'src/clinic/entities/clinic.entity'
import { User } from 'src/user/entities/user.entity'
import { BaseEntity } from 'src/common/entities'
import { Country } from './country.entity'
import { State } from './state.entity'
import { City } from './city.entity'

@Entity({ name: 'addresses' })
export class Address extends BaseEntity {
  @Column('varchar')
  houseNumber: string

  @Column('varchar')
  streetNumber: string

  @OneToOne(() => User, (user) => user.address)
  user: User

  @OneToOne(() => Hospital, (hospital) => hospital.address)
  hospital: Hospital

  @OneToOne(() => Clinic, (clinic) => clinic.address)
  clinic: Clinic

  @ManyToOne(() => Country, (country) => country.address, {
    nullable: false
  })
  country: Country

  @ManyToOne(() => City, (city) => city.address, {
    nullable: false
  })
  city: City

  @ManyToOne(() => State, (state) => state.address, {
    nullable: false
  })
  state: State
}
