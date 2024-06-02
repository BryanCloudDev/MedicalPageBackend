import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsUUID } from 'class-validator'

export class CreateAddressDto {
  @ApiProperty({
    description: 'User address',
    minimum: 1,
    maximum: 30,
    default: '10'
  })
  @IsString()
  @Length(1, 30)
  houseNumber: string

  @ApiProperty({
    description: 'Street number',
    minimum: 1,
    maximum: 90,
    default: '34'
  })
  @IsString()
  @Length(1, 90)
  streetNumber: string

  @ApiProperty({
    description: 'Country ID',
    format: 'uuid',
    default: '0511313e-6123-44f5-a7af-8847cff31c1a'
  })
  @IsUUID()
  countryId: string

  @ApiProperty({
    description: 'City ID',
    format: 'uuid',
    default: '0511313e-6123-44f5-a7af-8847cff31c1a'
  })
  @IsUUID()
  cityId: string

  @ApiProperty({
    description: 'State ID',
    format: 'uuid',
    default: '0511313e-6123-44f5-a7af-8847cff31c1a'
  })
  @IsUUID()
  stateId: string
}
