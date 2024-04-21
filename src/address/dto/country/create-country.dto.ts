import { IsString, Length } from 'class-validator'

export class CreateCountryDto {
  @IsString()
  @Length(5, 20)
  name: string
}
