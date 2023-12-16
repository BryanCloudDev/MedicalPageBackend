import { User } from 'src/common/entities'
import { Column, Entity } from 'typeorm'

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
}
