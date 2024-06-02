import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateSpecialtyDto {
  @ApiProperty({
    description: 'Specialty name',
    example: 'Cardiology',
    minLength: 5,
    maxLength: 50
  })
  @IsString()
  @Length(5, 50)
  @IsNotEmpty()
  name: string
}
