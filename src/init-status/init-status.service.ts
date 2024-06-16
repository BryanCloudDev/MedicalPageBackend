import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, Logger } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InitStatus } from './entities/init.entity'
import {
  CountryService,
  StateService,
  CityService,
  PhoneCodeService
} from 'src/address/service'
import { elSalvador } from 'src/init-status/el-salvador'
import { City } from 'src/address/entities/city.entity'
import { exceptionHandler } from 'src/common/utils'

@Injectable()
export class InitService {
  constructor(
    @InjectRepository(InitStatus)
    private readonly initStatusRepository: Repository<InitStatus>,
    private readonly countryService: CountryService,
    private readonly stateService: StateService,
    private readonly cityService: CityService,
    private readonly phoneCodeService: PhoneCodeService
  ) {}

  private readonly logger = new Logger(InitService.name)

  async initialize() {
    const status = await this.initStatusRepository.findOne({ where: { id: 1 } })

    if (status && status.initialized) {
      return
    }

    // Initialize your data
    await this.createAddressData()

    // Mark as initialized
    if (!status) {
      const newStatus = this.initStatusRepository.create({
        id: 1,
        initialized: true
      })
      await this.initStatusRepository.save(newStatus)

      return
    }

    status.initialized = true
    await this.initStatusRepository.save(status)
  }

  async createAddressData() {
    try {
      const country = await this.countryService.create({
        name: elSalvador.country
      })

      await this.phoneCodeService.create({
        code: elSalvador.regionCode
      })

      const citiesItems: Promise<City>[] = []

      for (const { name } of elSalvador.states) {
        const stateToBeCreated = await this.stateService.create({
          name,
          countryId: country.id
        })

        const citiesPerState = elSalvador.cities.filter(
          (city) => city.state === name
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
