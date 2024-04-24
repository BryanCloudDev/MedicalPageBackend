import { IsNumberString, IsString, IsUUID, Length } from 'class-validator'
import { IsValidPhoneNumber } from 'src/common/decorators'
import { CreateUserDto } from 'src/user/dto/create-user.dto'

export class CreateDoctorDto extends CreateUserDto {
  @IsNumberString()
  @Length(3, 15)
  jvpmNumber: string

  @IsUUID()
  specialtyId: string

  @IsString()
  @IsValidPhoneNumber()
  officePhoneNumber: string
}
