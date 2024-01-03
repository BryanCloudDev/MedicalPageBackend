import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { BaseEntity } from 'src/common/entities'
import { Country } from './country.entity'
import { User } from 'src/user/entities/user.entity'

@Entity({ name: 'phone_codes' })
export class PhoneCode extends BaseEntity {
  @Column('varchar', {
    unique: true
  })
  code: string

  @OneToOne(() => Country, (country) => country.phoneCode, {
    nullable: false
  })
  country: Country

  @OneToMany(() => User, (user) => user.phoneCode)
  user: User[]
}
