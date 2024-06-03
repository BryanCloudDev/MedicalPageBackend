import { ApiProperty } from '@nestjs/swagger'
import { Address } from 'src/address/entities/address.entity'
import { Roles } from 'src/user/enums'
import { AddressResponse } from './address.class'
import { RegionNumberResponse } from './region-number.class'

export class UserResponse {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 'e00cd96b-e31a-44fa-a2ba-f28adf3d2eb2'
  })
  id: string

  @ApiProperty({ description: 'The first name of the user', example: 'John' })
  firstName: string

  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  lastName: string

  @ApiProperty({
    description: 'The email address of the user',
    example: 'email@email.com'
  })
  email: string

  @ApiProperty({
    description: 'The mobile phone number of the user',
    example: '78787878'
  })
  mobilePhoneNumber: string

  @ApiProperty({
    description: "The URL of the user's photo",
    example: 'https://imgur.com/1Vr5Zsj'
  })
  photo: string

  @ApiProperty({
    description: 'The birth date of the user',
    example: '2021-02-01'
  })
  birthDate: string

  @ApiProperty({
    description: 'The date of the last login',
    example: '2021-02-01T12:00:00.000Z',
    type: Date
  })
  lastLogin: Date

  @ApiProperty({
    description: 'The role of the user',
    enum: Roles,
    example: Roles.PATIENT
  })
  role: Roles

  @ApiProperty({
    description: 'Indicates if the user is active or not',
    example: true
  })
  isActive: boolean

  @ApiProperty({
    description: 'Address details of the user',
    type: AddressResponse
  })
  address: Address

  @ApiProperty({
    description: 'The region number of the user',
    type: RegionNumberResponse
  })
  regionNumber: RegionNumberResponse
}
