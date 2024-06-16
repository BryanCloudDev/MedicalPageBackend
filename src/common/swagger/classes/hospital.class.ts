import { ApiProperty } from '@nestjs/swagger'
import { FilteredAllResponse } from './address.class'

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

export class HospitalResponseAll extends FilteredAllResponse {
  @ApiProperty({
    isArray: true,
    type: HospitalResponse,
    description: 'The data array of the response'
  })
  data: HospitalResponse[]
}
