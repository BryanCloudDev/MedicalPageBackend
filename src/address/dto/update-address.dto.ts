import { PartialType } from '@nestjs/mapped-types'
import { CreateAddressDto } from './create-address.dto'
import { IsOptional, IsUUID } from 'class-validator'

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @IsOptional()
  @IsUUID()
  id: string
}
