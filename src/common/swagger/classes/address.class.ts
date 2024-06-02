import { ApiProperty } from '@nestjs/swagger'

export class CountryResponse {
  @ApiProperty({ example: '2f2da446-face-4864-9a36-a2e66eadc816' })
  id: string

  @ApiProperty({ example: null, nullable: true })
  deletedOn: Date | null

  @ApiProperty({ example: 'El Salvador' })
  name: string
}

export class StateResponse {
  @ApiProperty({ example: '2f2da446-face-4864-9a36-a2e66eadc816' })
  id: string

  @ApiProperty({ example: null, nullable: true })
  deletedOn: Date | null

  @ApiProperty({ example: 'La Libertad' })
  name: string
}

export class CityResponse {
  @ApiProperty({ example: '2f2da446-face-4864-9a36-a2e66eadc816' })
  id: string

  @ApiProperty({ example: null, nullable: true })
  deletedOn: Date | null

  @ApiProperty({ example: 'Santa Tecla' })
  name: string
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
