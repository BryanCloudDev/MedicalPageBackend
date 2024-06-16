import { CreateSponsorLevelDto } from 'src/sponsor-level/dto/create-sponsor-level.dto'
import { Subscription } from 'src/sponsor-level/enum/subscription.enum'

export const sponsorLevels: CreateSponsorLevelDto[] = [
  {
    name: Subscription.BASIC,
    price: 19.99,
    duration: 84600,
    description:
      'El plan Essential Care es perfecto para médicos que recién comienzan en la plataforma.'
  },
  {
    name: Subscription.PREMIUM,
    price: 39.99,
    duration: 259200,
    description:
      'El plan Premium Care es perfecto para médicos que buscan más visibilidad en la plataforma.'
  },
  {
    name: Subscription.ULTIMATE,
    price: 59.99,
    duration: 518400,
    description:
      'El plan Plus Care es perfecto para médicos que buscan más pacientes en la plataforma.'
  }
]
