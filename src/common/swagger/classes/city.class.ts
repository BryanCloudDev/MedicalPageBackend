import { ApiProperty } from '@nestjs/swagger'

export class CityResponse {
  @ApiProperty({
    description: 'City ID',
    example: 'd9c5d8c0-3a1d-4c2a-8c4a-2b6c6f4e5b9b'
  })
  id: string

  @ApiProperty({
    description: 'City name',
    example: 'La Libertad',
    minLength: 5,
    maxLength: 30
  })
  name: string
}
