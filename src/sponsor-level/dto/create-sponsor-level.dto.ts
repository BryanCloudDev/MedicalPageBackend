import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsInt, IsString, Length } from 'class-validator'
import { Subscription } from '../enum/subscription.enum'

export class CreateSponsorLevelDto {
  @ApiProperty({
    enum: Subscription,
    example: Subscription.BASIC,
    description: 'Subscription type',
    minimum: 5,
    maximum: 25
  })
  @IsString()
  @Length(5, 25)
  name: Subscription

  @ApiProperty({
    example: 19.99,
    description: 'Subscription price',
    minimum: 0
  })
  @IsNumber()
  @Type(() => Number)
  price: number

  @ApiProperty({
    example: 84600,
    description: 'Subscription duration in seconds',
    minimum: 1
  })
  @IsInt()
  @Type(() => Number)
  duration: number

  @ApiProperty({
    example:
      'El plan Essential Care es perfecto para médicos que recién comienzan en la plataforma.',
    description: 'Subscription description',
    minimum: 5,
    maximum: 100
  })
  @IsString()
  @Length(5, 100)
  description: string
}
