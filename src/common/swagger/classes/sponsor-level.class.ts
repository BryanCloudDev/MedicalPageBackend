import { ApiProperty } from '@nestjs/swagger'
import { Subscription } from 'src/sponsor-level/enum/subscription.enum'

export class SponsorLevelResponse {
  @ApiProperty({
    description: 'Sponsro Level ID',
    example: '93133f53-d309-455e-b506-0663a5ad297f'
  })
  id: string

  @ApiProperty({
    description: 'The name of the subscription plan',
    example: Subscription.BASIC,
    enum: Subscription
  })
  name: string

  @ApiProperty({
    description: 'The price of the subscription plan',
    example: 19.99
  })
  price: number

  @ApiProperty({
    description: 'The duration of the subscription plan in seconds',
    example: 84600
  })
  duration: number

  @ApiProperty({
    description: 'The description of the subscription plan',
    example:
      'El plan Essential Care es perfecto para médicos que recién comienzan en la plataforma.'
  })
  description: string
}
