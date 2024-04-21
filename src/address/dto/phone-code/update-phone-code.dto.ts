import { PartialType } from '@nestjs/mapped-types'
import { CreatePhoneCodeDto } from './create-phone-code.dto'

export class UpdatePhoneCodeDto extends PartialType(CreatePhoneCodeDto) {}
