import { IsString, Length, IsUUID } from 'class-validator'

export class CreateAddressDto {
  @IsString()
  @Length(1, 30)
  houseNumber: string

  @IsString()
  @Length(1, 90)
  streetNumber: string

  @IsUUID()
  countryId: string

  @IsUUID()
  cityId: string

  @IsUUID()
  stateId: string
}
