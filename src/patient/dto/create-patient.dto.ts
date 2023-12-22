import {
  IsDate,
  IsEmail,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'
import { MobilePhoneDto } from './mobilePhone.dto'
import { CreateAddressDto } from 'src/address/dto/create-address.dto'
import { IsLaterThan } from 'src/common/decorators'

export class CreatePatientDto {
  @IsString()
  @Length(3, 15)
  firstName: string

  @IsString()
  @Length(3, 15)
  lastName: string

  @IsEmail()
  email: string

  @IsStrongPassword()
  password: string

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => MobilePhoneDto)
  mobilePhone?: MobilePhoneDto

  // @Column('varchar', { default: 'https://imgur.com/1Vr5Zsj' })
  // photo: string

  @IsDate()
  @IsLaterThan()
  @Type(() => Date)
  birthDate: Date

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @IsNotEmptyObject()
  address: CreateAddressDto
}
