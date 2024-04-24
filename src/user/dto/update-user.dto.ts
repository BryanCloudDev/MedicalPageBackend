import { Type } from 'class-transformer'
import { IsDate, IsString, Length } from 'class-validator'
import { IsLaterThan, IsValidPhoneNumber } from 'src/common/decorators'

export class UpdateUserDto {
  @IsString()
  @Length(3, 15)
  firstName?: string

  @IsString()
  @Length(3, 15)
  lastName?: string

  @IsString()
  @IsValidPhoneNumber('mobilePhone')
  mobilePhoneNumber?: string

  @IsDate()
  @IsLaterThan()
  @Type(() => Date)
  birthDate?: Date

  photo?: string

  lastLoginOn?: Date
}
