import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty({
    example: 'Clinica Miranda',
    description: 'The name of the clinic',
    minimum: 3,
    maximum: 50
  })
  @IsString()
  @Length(3, 50)
  name: string

  @ApiProperty({
    type: CreateAddressDto,
    description: 'The address of the clinic'
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
