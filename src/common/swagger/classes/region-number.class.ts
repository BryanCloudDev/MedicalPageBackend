import { ApiProperty } from '@nestjs/swagger'

export class RegionNumberResponse {
  @ApiProperty({
    description: 'The unique identifier of the region number',
    example: '1a95fdab-5e72-4dac-b08c-c19d16ac9b2c'
  })
  id: string

  @ApiProperty({
    description: 'The date when the region number was deleted',
    example: '2021-02-01T12:00:00.000Z',
    type: Date
  })
  deletedOn?: Date

  @ApiProperty({
    description: 'The region number',
    example: '+503'
  })
  code: string
}
