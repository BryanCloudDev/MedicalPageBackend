import { ApiProperty } from '@nestjs/swagger'

export class HospitalResponse {
  @ApiProperty({
    example: 'af64d39b-0d2a-41d0-8cc7-44914e4ba19b',
    description: 'Hospital ID'
  })
  id: string

  @ApiProperty({
    example: 'Hospital San Rafael',
    description: 'The name of the hospital.'
  })
  name: string
}
