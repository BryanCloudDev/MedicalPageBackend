import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Address } from '../entities/address.entity'
import { CreateAddressDto } from '../dto/create-address.dto'
// import { elSalvadorDb } from '../el-salvador-cities-departments'
import { StateService } from './state.service'
import { CountryService } from './country.service'
import { CityService } from './city.service'
import { City } from '../entities/city.entity'
import { PhoneCodeService } from './phone-code.service'
import { errorHandler } from 'src/common/utils'
import { Country } from '../entities/country.entity'
import { State } from '../entities/state.entity'

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly phoneCodeService: PhoneCodeService,
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

  // run seed for ES data
  // async runSeed() {
  //   const states = new Set(elSalvadorDb.map((city) => city.state)).keys()
  //   const country = await this.countryService.create('El Salvador')
  //   await this.phoneCodeService.create('+503', country)
  //   const citiesItems: Promise<City>[] = []

  //   for (const state of states) {
  //     const stateToBeCreated = await this.stateService.create(state, country)

  //     const citiesPerState = elSalvadorDb.filter((city) => city.state === state)

  //     for (const city of citiesPerState) {
  //       citiesItems.push(this.cityService.create(city.city, stateToBeCreated))
  //     }
  //   }

  //   await Promise.all(citiesItems)
  // }
}
