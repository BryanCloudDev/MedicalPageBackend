import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsUUID, IsDate, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { IsValidPhoneNumber, IsLaterThan } from 'src/common/decorators'

export class UpdateAdministratorDto {
  @ApiProperty({
    example: 'John',
    description: 'User first name',
    minimum: 3,
    maximum: 15
  })
  @IsOptional()
  @IsString()
  @Length(3, 15)
  firstName: string

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
    minimum: 3,
    maximum: 15
  })
  @IsOptional()
  @IsString()
  @Length(3, 15)
  lastName: string

  @ApiProperty({
    example: '1a95fdab-5e72-4dac-b08c-c19d16ac9b2c',
    description: 'Region number ID'
  })
  @IsOptional()
  @IsUUID()
  regionNumberId: string

  @ApiProperty({
    example: '70707070',
    description: 'User mobile phone number'
  })
  @IsOptional()
  @IsString()
  @IsValidPhoneNumber('mobilePhone')
  mobilePhoneNumber?: string

  @ApiProperty({
    type: Date,
    example: '2021-02-01T12:00:00.000Z',
    description: 'User birth date'
  })
  @IsOptional()
  @IsLaterThan()
  @IsDate()
  @Type(() => Date)
  birthDate: Date
}
