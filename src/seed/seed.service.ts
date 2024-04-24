import { Injectable, Logger } from '@nestjs/common'
import { elSalvadorDb } from 'src/address/el-salvador-cities-departments'
import { City } from 'src/address/entities/city.entity'
import {
  CountryService,
  StateService,
  CityService,
  PhoneCodeService
} from 'src/address/service'
import { exceptionHandler } from 'src/common/utils'

@Injectable()
export class SeedService {
  constructor(
    private readonly countryService: CountryService,
    private readonly stateService: StateService,
    private readonly cityService: CityService,
    private readonly phoneCodeService: PhoneCodeService
  ) {}

  private readonly logger = new Logger(SeedService.name)

  // run seed for ES data
  async runSeed() {
    // try {
    //   const states = new Set(elSalvadorDb.map((city) => city.state)).keys()

    //   const country = await this.countryService.create('El Salvador')

    //   await this.phoneCodeService.create('+503', country)

    //   const citiesItems: Promise<City>[] = []

    //   for (const state of states) {
    //     const stateToBeCreated = await this.stateService.create(state, country)
    //     const citiesPerState = elSalvadorDb.filter(
    //       (city) => city.state === state
    //     )
    //     for (const city of citiesPerState) {
    //       citiesItems.push(this.cityService.create(city.city, stateToBeCreated))
    //     }
    //   }

    //   await Promise.all(citiesItems)

    //   return {
    //     countries: await this.countryService.getAll(),
    //     phoneCodes: await this.phoneCodeService.getAll()
    //   }
    // } catch (error) {
    //   exceptionHandler(this.logger, error)
    // }
  }
}
