import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator'

export class LoginUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'The email of the user'
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'P455W0RD!23',
    description: 'The password of the user',
    minimum: 6,
    maximum: 50
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string
}
