import { Type } from 'class-transformer'
import {
  IsNumberString,
  IsOptional,
  IsUUID,
  Length,
  ValidateNested
} from 'class-validator'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { PhoneDto } from './phone.dto'

export class CreateDoctorDto extends CreateUserDto {
  @IsNumberString()
  @Length(3, 15)
  jvpmNumber: number

  @IsUUID()
  specialtyId: string

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => PhoneDto)
  phone: PhoneDto
}
