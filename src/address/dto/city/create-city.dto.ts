import { IsString, IsUUID, Length } from 'class-validator'

export class CreateCityDto {
  @IsString()
  @Length(5, 30)
  name: string

  @IsUUID()
  stateId: string
}
