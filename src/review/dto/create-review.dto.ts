import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength
} from 'class-validator'

export class CreateReviewDto {
  @ApiProperty({
    description: 'The comment for the review',
    maxLength: 500,
    example: 'Texto de prueba'
  })
  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  comment: string

  @ApiProperty({
    description: 'Doctor ID',
    example: 'ab55bd85-9f60-48ae-9245-e7ffd26b3416'
  })
  @IsUUID()
  doctorId: string

  @ApiProperty({
    description: 'The rating for the doctor (between 1 and 10)',
    example: 3
  })
  @IsString()
  @Matches(/^(10|[1-9])$/, {
    message: 'rating must be between 1 and 10'
  })
  rating: number
}
