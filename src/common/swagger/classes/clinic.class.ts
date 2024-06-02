import { ApiProperty } from '@nestjs/swagger'

export class ClinicResponse {
  @ApiProperty({
    example: 'af64d39b-0d2a-41d0-8cc7-44914e4ba19b',
    description: 'Clinic ID'
  })
  id: string

  @ApiProperty({
    example: 'Clinica San Rafael',
    description: 'The name of the clinic.'
  })
  name: string
}
