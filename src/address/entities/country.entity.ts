import { BaseEntity, Entity } from 'typeorm'

@Entity({ name: 'countries' })
export class Country extends BaseEntity {}
