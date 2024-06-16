import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsString,
  Length,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsUUID,
  IsDate
} from 'class-validator'
import { IsValidPhoneNumber, IsLaterThan } from 'src/common/decorators'

export class CreateAdministratorDto {
  @ApiProperty({
    example: 'John',
    description: 'User first name',
    minimum: 3,
    maximum: 15
  })
  @IsString()
  @Length(3, 15)
  firstName: string

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
    minimum: 3,
    maximum: 15
  })
  @IsString()
  @Length(3, 15)
  lastName: string

  @ApiProperty({ example: 'email@gmail.com', description: 'User email' })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'P455W0RD!23',
    description: 'User password',
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

  @ApiProperty({
    example: '1a95fdab-5e72-4dac-b08c-c19d16ac9b2c',
    description: 'Region number ID'
  })
  @IsUUID()
  regionNumberId: string

  @ApiProperty({
    example: '70707070',
    description: 'User mobile phone number'
  })
  @IsString()
  @IsValidPhoneNumber('mobilePhone')
  mobilePhoneNumber?: string

  @ApiProperty({
    type: Date,
    example: '2021-02-01T12:00:00.000Z',
    description: 'User birth date'
  })
  @IsLaterThan()
  @IsDate()
  @Type(() => Date)
  birthDate: Date
}
