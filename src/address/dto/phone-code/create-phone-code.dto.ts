import { IsString, Matches } from 'class-validator'

export class CreatePhoneCodeDto {
  @IsString()
  @Matches(/^\+\d{1,3}$/, {
    message: 'Phone code must be in format +xxxx, eg: +503'
  })
  code: string
}
