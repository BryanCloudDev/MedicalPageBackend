import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CreateAddressDto } from '../dto/create-address.dto'
import { Address } from '../entities/address.entity'
import { CountryService } from './country.service'
import { exceptionHandler } from 'src/common/utils'
import { StateService } from './state.service'
import { CityService } from './city.service'

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly countryService: CountryService,
    private readonly stateService: StateService,
    private readonly cityService: CityService
  ) {}

  private readonly logger = new Logger(AddressService.name)

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    try {
      const { countryId, stateId, cityId, ...partialAddress } = createAddressDto

      const countryPromise = this.countryService.findById(countryId)
      const statePromise = this.stateService.findById(stateId)
      const cityPromise = this.cityService.findById(cityId)

      const [country, state, city] = await Promise.all([
        countryPromise,
        statePromise,
        cityPromise
      ])

      if (!country) {
        throw new NotFoundException(`Country with ID ${countryId} not found`)
      }

      if (!state) {
        throw new NotFoundException(`State with ID ${stateId} not found`)
      }

      if (!city) {
        throw new NotFoundException(`City with ID ${cityId} not found`)
      }

      const addressInstance = this.addressRepository.create({
        ...partialAddress,
        country,
        state,
        city
      })

      const address = await this.addressRepository.save(addressInstance)

      return address
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
