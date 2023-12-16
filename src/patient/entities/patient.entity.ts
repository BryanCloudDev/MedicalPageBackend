import { User } from 'src/common/entities'
import { Entity } from 'typeorm'

@Entity({ name: 'patients' })
export class Patient extends User {}
