import { Injectable, Logger } from '@nestjs/common'
import { elSalvadorDb } from 'src/seed/el-salvador-cities-departments'
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
    try {
      const states = new Set(elSalvadorDb.map((city) => city.state)).keys()

      const country = await this.countryService.create({
        name: 'El Salvador'
      })

      await this.phoneCodeService.create({
        code: '+503'
      })

      const citiesItems: Promise<City>[] = []

      for (const state of states) {
        const stateToBeCreated = await this.stateService.create({
          name: state,
          countryId: country.id
        })

        const citiesPerState = elSalvadorDb.filter(
          (city) => city.state === state
        )
        for (const city of citiesPerState) {
          citiesItems.push(
            this.cityService.create({
              name: city.city,
              stateId: stateToBeCreated.id
            })
          )
        }
      }

      await Promise.all(citiesItems)

      return {
        countries: await this.countryService.findAll(),
        phoneCodes: await this.phoneCodeService.getAll()
      }
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
