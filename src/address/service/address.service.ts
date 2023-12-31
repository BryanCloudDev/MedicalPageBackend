import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Address } from '../entities/address.entity'
import { CreateAddressDto } from '../dto/create-address.dto'
// import { elSalvadorDb } from '../el-salvador-cities-departments'
import { StateService } from './state.service'
import { CountryService } from './country.service'
import { CityService } from './city.service'
// import { City } from '../entities/city.entity'
// import { PhoneCodeService } from './phone-code.service'

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    // private readonly phoneCodeService: PhoneCodeService,
    private readonly countryService: CountryService,
    private readonly stateService: StateService,
    private readonly cityService: CityService
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
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

    const address = this.addressRepository.create({
      ...partialAddress,
      country,
      state,
      city
    })

    return this.addressRepository.save(address)
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
