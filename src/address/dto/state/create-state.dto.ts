import { IsString, IsUUID, Length } from 'class-validator'

export class CreateStateDto {
  @IsString()
  @Length(5, 20)
  name: string

  @IsUUID()
  countryId: string
}
