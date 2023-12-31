import {
  IsDate,
  IsEmail,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'
import { CreateAddressDto } from 'src/address/dto/create-address.dto'
import { IsLaterThan } from 'src/common/decorators'
import { MobilePhoneDto } from './mobilePhone.dto'

export class CreatePatientDto {
  @IsString()
  @Length(3, 15)
  firstName: string

  @IsString()
  @Length(3, 15)
  lastName: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => MobilePhoneDto)
  mobilePhone?: MobilePhoneDto

  @IsDate()
  @IsLaterThan()
  @Type(() => Date)
  birthDate: Date

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @IsNotEmptyObject()
  address: CreateAddressDto
}
