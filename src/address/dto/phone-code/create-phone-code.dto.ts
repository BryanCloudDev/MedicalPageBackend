import { ApiProperty } from '@nestjs/swagger'
import { IsString, Matches } from 'class-validator'

export class CreatePhoneCodeDto {
  @ApiProperty({
    description: 'Phone code',
    example: '+503'
  })
  @IsString()
  @Matches(/^\+\d{1,3}$/, {
    message: 'Phone code must be in format +xxxx, eg: +503'
  })
  code: string
}
