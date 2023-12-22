import { IsString, IsUUID } from 'class-validator'
import { IsValidPhoneNumber } from 'src/common/decorators'

export class MobilePhoneDto {
  @IsString()
  @IsValidPhoneNumber('mobilePhone')
  number: string

  @IsUUID()
  areaCodeId: string
}
