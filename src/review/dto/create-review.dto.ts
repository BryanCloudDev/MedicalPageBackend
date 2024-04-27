import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength
} from 'class-validator'

export class CreateReviewDto {
  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  comment: string

  @IsUUID()
  doctorId: string

  @IsString()
  @Matches(/^(10|[1-9])$/, {
    message: 'rating must be between 1 and 10'
  })
  rating: number
}
