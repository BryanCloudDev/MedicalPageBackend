import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CreateAddressDto } from '../dto/address/create-address.dto'
import { UpdateAddressDto } from '../dto/address/update-address.dto'
import { Country } from '../entities/country.entity'
import { Address } from '../entities/address.entity'
import { exceptionHandler } from 'src/common/utils'
import { CountryService } from './country.service'
import { State } from '../entities/state.entity'
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

      this.checkIfCountryExists(countryId, country)
      this.checkIfStateExists(stateId, state)
      this.checkIfCityExists(cityId, city)

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

  async updateById(id: string, updateAddressDto: UpdateAddressDto) {
    try {
      const { countryId, stateId, cityId, ...partialAddress } = updateAddressDto

      const addressPromise = this.addressRepository.findOneBy({
        id
      })

      const countryPromise = this.countryService.findById(countryId)
      const statePromise = this.stateService.findById(stateId)
      const cityPromise = this.cityService.findById(cityId)

      const [address, country, state, city] = await Promise.all([
        addressPromise,
        countryPromise,
        statePromise,
        cityPromise
      ])

      this.checkIfCountryExists(countryId, country)
      this.checkIfStateExists(stateId, state)
      this.checkIfAddressExists(id, address)
      this.checkIfCityExists(cityId, city)

      await this.addressRepository.update(id, {
        ...address,
        ...partialAddress,
        country,
        state,
        city
      })

      return
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private checkIfAddressExists(id: string, address: Address | undefined) {
    if (!address) {
      throw new NotFoundException(`The address with ${id} was not found`)
    }
  }

  private checkIfCityExists(id: string, city: City | undefined) {
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`)
    }
  }

  private checkIfStateExists(id: string, state: State | undefined) {
    if (!state) {
      throw new NotFoundException(`State with ID ${id} not found`)
    }
  }

  private checkIfCountryExists(id: string, country: Country | undefined) {
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`)
    }
  }
}
