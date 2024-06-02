import { ApiProperty } from '@nestjs/swagger'

export class ReviewResponse {
  @ApiProperty({
    description: 'Review ID',
    example: 'ab55bd85-9f60-48ae-9245-e7ffd26b3416'
  })
  id: string

  @ApiProperty({
    description: 'The comment for the review',
    maxLength: 500,
    example: 'Texto de prueba'
  })
  comment: string

  @ApiProperty({
    description: 'The rating for the doctor (between 1 and 10)',
    example: 3
  })
  rating: number
}
