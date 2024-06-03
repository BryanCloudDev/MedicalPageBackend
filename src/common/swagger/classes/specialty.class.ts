import { ApiProperty } from '@nestjs/swagger'

export class SpecialtyResponse {
  @ApiProperty({
    description: 'Specialty ID',
    example: '4f2b3556-b1c9-4527-9a03-2d281787753a'
  })
  id: string

  @ApiProperty({
    description: 'Specialty name',
    example: 'Cardiology'
  })
  name: string
}
