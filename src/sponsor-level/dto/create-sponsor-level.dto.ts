import { Type } from 'class-transformer'
import { IsNumber, IsInt, IsString, Length } from 'class-validator'

export class CreateSponsorLevelDto {
  @IsNumber()
  @Type(() => Number)
  price: number

  @IsInt()
  @Type(() => Number)
  duration: number

  @IsString()
  @Length(5, 100)
  description: string
}
