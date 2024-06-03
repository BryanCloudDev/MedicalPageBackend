import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class CreateCountryDto {
  @ApiProperty({
    description: 'Country name',
    example: 'Brazil',
    minimum: 5,
    maximum: 20
  })
  @IsString()
  @Length(5, 20)
  name: string
}
