import { Type } from 'class-transformer'
import {
  IsString,
  Length,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  ValidateNested,
  IsDate,
  IsNotEmptyObject,
  IsUUID
} from 'class-validator'
import { CreateAddressDto } from 'src/address/dto/address/create-address.dto'
import { IsLaterThan, IsValidPhoneNumber } from 'src/common/decorators'

export class CreateUserDto {
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

  @IsUUID()
  regionNumberId: string

  @IsString()
  @IsValidPhoneNumber('mobilePhone')
  mobilePhoneNumber?: string

  @IsDate()
  @IsLaterThan()
  @Type(() => Date)
  birthDate: Date

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @IsNotEmptyObject()
  address: CreateAddressDto
}
