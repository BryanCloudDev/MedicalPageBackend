import { BaseEntity } from 'src/common/entities'
import { User } from 'src/user/entities/user.entity'
import { Entity, OneToOne, JoinColumn } from 'typeorm'

@Entity({ name: 'administrators' })
export class Administrator extends BaseEntity {
  @OneToOne(() => User, (user) => user.administrator, {
    nullable: false
  })
  @JoinColumn()
  user: User
}
