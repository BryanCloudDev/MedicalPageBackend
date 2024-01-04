import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CreateAddressDto } from '../dto/create-address.dto'
import { Address } from '../entities/address.entity'
import { Country } from '../entities/country.entity'
import { CountryService } from './country.service'
import { State } from '../entities/state.entity'
import { errorHandler } from 'src/common/utils'
import { City } from '../entities/city.entity'
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
    const { countryId, stateId, cityId, ...partialAddress } = createAddressDto

    const countryPromise = this.countryService.findById(countryId)
    const statePromise = this.stateService.findById(stateId)
    const cityPromise = this.cityService.findById(cityId)

    let country: Country, state: State, city: City

    try {
      ;[country, state, city] = await Promise.all([
        countryPromise,
        statePromise,
        cityPromise
      ])
    } catch (error) {
      errorHandler(this.logger, error)
    }

    if (!country) {
      throw new NotFoundException(`Country with ID ${countryId} not found`)
    }

    if (!state) {
      throw new NotFoundException(`State with ID ${stateId} not found`)
    }

    if (!city) {
      throw new NotFoundException(`City with ID ${cityId} not found`)
    }

    try {
      const addressInstance = this.addressRepository.create({
        ...partialAddress,
        country,
        state,
        city
      })

      const address = await this.addressRepository.save(addressInstance)

      return address
    } catch (error) {
      errorHandler(this.logger, error)
    }
  }
}
