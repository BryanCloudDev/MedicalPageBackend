import { Type } from 'class-transformer'
import {
  IsDate,
  IsEmail,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested
} from 'class-validator'
import { UpdateAddressDto } from 'src/address/dto/address/update-address.dto'
import { IsLaterThan } from 'src/common/decorators'
import { MobilePhoneDto } from 'src/user/dto/mobilePhone.dto'

export class UpdateUserDto {
  @IsString()
  @Length(3, 15)
  firstName?: string

  @IsString()
  @Length(3, 15)
  lastName?: string

  @IsEmail()
  email?: string

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => MobilePhoneDto)
  mobilePhone?: MobilePhoneDto

  @IsDate()
  @IsLaterThan()
  @Type(() => Date)
  birthDate?: Date

  @IsString()
  @IsOptional()
  photo?: string

  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  @IsNotEmptyObject()
  address?: UpdateAddressDto
}
