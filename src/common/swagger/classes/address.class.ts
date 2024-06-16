import { ApiProperty } from '@nestjs/swagger'
export class FilteredAllResponse {
  @ApiProperty({ description: 'The total number of items' })
  total: number

  @ApiProperty({ description: 'The next page URL', nullable: true })
  next: string | null

  @ApiProperty({ description: 'The previous page URL', nullable: true })
  previous: string | null
}

export class CountryResponse {
  @ApiProperty({ example: '2f2da446-face-4864-9a36-a2e66eadc816' })
  id: string

  @ApiProperty({ example: null, nullable: true })
  deletedOn: Date | null

  @ApiProperty({ example: 'El Salvador' })
  name: string
}

export class CountryResponseAll extends FilteredAllResponse {
  @ApiProperty({
    isArray: true,
    type: CountryResponse,
    description: 'The data array of the response'
  })
  data: CountryResponse[]
}

export class StateResponse {
  @ApiProperty({ example: '2f2da446-face-4864-9a36-a2e66eadc816' })
  id: string

  @ApiProperty({ example: null, nullable: true })
  deletedOn: Date | null

  @ApiProperty({ example: 'La Libertad' })
  name: string
}

export class StateResponseAll extends FilteredAllResponse {
  @ApiProperty({
    isArray: true,
    type: StateResponse,
    description: 'The data array of the response'
  })
  data: StateResponse[]
}

export class CityResponse {
  @ApiProperty({ example: '2f2da446-face-4864-9a36-a2e66eadc816' })
  id: string

  @ApiProperty({ example: null, nullable: true })
  deletedOn: Date | null

  @ApiProperty({ example: 'Santa Tecla' })
  name: string
}

export class CityResponseAll extends FilteredAllResponse {
  @ApiProperty({
    isArray: true,
    type: CityResponse,
    description: 'The data array of the response'
  })
  data: CityResponse[]
}

export class AddressResponse {
  @ApiProperty({ example: 'd1cf9413-bfcb-4bb7-9fff-6bd57da36fe4' })
  id: string

  @ApiProperty({ example: '#34' })
  houseNumber: string

  @ApiProperty({ example: 'Sample, Address' })
  streetNumber: string

  @ApiProperty({ type: CountryResponse })
  country: CountryResponse

  @ApiProperty({ type: CityResponse })
  city: CityResponse

  @ApiProperty({ type: StateResponse })
  state: StateResponse
}

export class AddressResponseAll extends FilteredAllResponse {
  @ApiProperty({
    isArray: true,
    type: AddressResponse,
    description: 'The data array of the response'
  })
  data: AddressResponse[]
}

export class PhoneCodeResponse {
  @ApiProperty({ example: 'd1cf9413-bfcb-4bb7-9fff-6bd57da36fe4' })
  id: string

  @ApiProperty({ example: '+503' })
  code: string
}

export class PhoneCodeResponseAll extends FilteredAllResponse {
  @ApiProperty({
    isArray: true,
    type: PhoneCodeResponse,
    description: 'The data array of the response'
  })
  data: PhoneCodeResponse[]
}
