import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsNotEmptyObject,
  IsString,
  IsUUID,
  Length,
  ValidateNested
} from 'class-validator'
import { CreateAddressDto } from 'src/address/dto/address/create-address.dto'

export class CreateHospitalDto {
  @ApiProperty({
    example: 'Hospital Nacional',
    description: 'The name of the hospital',
    minimum: 3,
    maximum: 50
  })
  @IsString()
  @Length(3, 50)
  name: string

  @ApiProperty({
    type: CreateAddressDto,
    description: 'The address of the hospital'
  })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @IsNotEmptyObject()
  address: CreateAddressDto

  @ApiProperty({
    example: '8f3c7d55-5ec3-4948-926e-18ea686b256a',
    description: 'Specialty ID'
  })
  @IsUUID()
  specialtyId: string
}
