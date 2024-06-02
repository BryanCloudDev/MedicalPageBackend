import { Type } from 'class-transformer'
import {
  IsString,
  Length,
  ValidateNested,
  IsNotEmptyObject,
  IsUUID
} from 'class-validator'
import { CreateAddressDto } from 'src/address/dto/address/create-address.dto'

export class CreateClinicDto {
  @IsString()
  @Length(3, 50)
  name: string

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @IsNotEmptyObject()
  address: CreateAddressDto

  @IsUUID()
  specialtyId: string
}
