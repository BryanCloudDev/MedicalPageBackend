import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsDate,
  IsNotEmptyObject,
  IsString,
  Length,
  ValidateNested
} from 'class-validator'
import { CreateAddressDto } from 'src/address/dto/address/create-address.dto'
import { IsLaterThan, IsValidPhoneNumber } from 'src/common/decorators'

export class UpdateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'Patient first name',
    minimum: 3,
    maximum: 15
  })
  @IsString()
  @Length(3, 15)
  firstName?: string

  @ApiProperty({
    example: 'Doe',
    description: 'Patient last name',
    minimum: 3,
    maximum: 15
  })
  @IsString()
  @Length(3, 15)
  lastName?: string

  @ApiProperty({
    example: '70707070',
    description: 'Patient mobile phone number'
  })
  @IsString()
  @IsValidPhoneNumber('mobilePhone')
  mobilePhoneNumber?: string

  @ApiProperty({
    type: Date,
    example: '2021-02-01T12:00:00.000Z',
    description: 'User birth date'
  })
  @IsDate()
  @IsLaterThan()
  @Type(() => Date)
  birthDate?: Date

  @ApiProperty({ type: CreateAddressDto, description: 'User address' })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @IsNotEmptyObject()
  address?: CreateAddressDto

  photo?: string

  lastLoginOn?: Date
}
