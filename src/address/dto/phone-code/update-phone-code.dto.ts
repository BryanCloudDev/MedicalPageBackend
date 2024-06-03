import { PartialType } from '@nestjs/swagger'
import { CreatePhoneCodeDto } from './create-phone-code.dto'

export class UpdatePhoneCodeDto extends PartialType(CreatePhoneCodeDto) {}
