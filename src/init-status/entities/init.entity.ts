import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'init_status' })
export class InitStatus {
  @PrimaryColumn()
  id: number

  @Column({
    type: 'boolean',
    default: false
  })
  initialized: boolean
}
