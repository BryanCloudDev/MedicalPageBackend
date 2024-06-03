import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID, Length } from 'class-validator'

export class CreateStateDto {
  @ApiProperty({
    description: 'State name',
    example: 'San Vicente',
    minimum: 5,
    maximum: 20
  })
  @IsString()
  @Length(5, 20)
  name: string

  @ApiProperty({
    description: 'Country ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  countryId: string
}
