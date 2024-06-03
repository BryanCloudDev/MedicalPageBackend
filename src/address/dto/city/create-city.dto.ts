import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID, Length } from 'class-validator'

export class CreateCityDto {
  @ApiProperty({
    description: 'City name',
    example: 'La Libertad',
    minLength: 5,
    maxLength: 30
  })
  @IsString()
  @Length(5, 30)
  name: string

  @ApiProperty({
    description: 'State ID',
    example: 'd9c5d8c0-3a1d-4c2a-8c4a-2b6c6f4e5b9b'
  })
  @IsUUID()
  stateId: string
}
