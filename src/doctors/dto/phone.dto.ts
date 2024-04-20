import { IsString, IsUUID } from 'class-validator'
import { IsValidPhoneNumber } from 'src/common/decorators'

export class PhoneDto {
  @IsString()
  @IsValidPhoneNumber()
  number: string

  @IsUUID()
  regionNumberId: string
}
