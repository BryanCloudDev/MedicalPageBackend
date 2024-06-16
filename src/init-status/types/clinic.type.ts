import { CreateAddressDto } from '../../address/dto/address/create-address.dto'

export type Clinic = {
  name: string
  specialtyId: string
  address: CreateAddressDto
}
