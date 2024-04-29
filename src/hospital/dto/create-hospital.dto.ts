import { Type } from 'class-transformer'
import {
  IsNotEmptyObject,
  IsString,
  Length,
  ValidateNested
} from 'class-validator'
import { CreateAddressDto } from 'src/address/dto/address/create-address.dto'

export class CreateHospitalDto {
  @IsString()
  @Length(3, 15)
  name: string

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @IsNotEmptyObject()
  address: CreateAddressDto
}
