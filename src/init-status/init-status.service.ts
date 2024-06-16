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
import { elSalvador } from 'src/init-status/data/el-salvador.data'
import { City } from 'src/address/entities/city.entity'
import { exceptionHandler } from 'src/common/utils'
import { specialties } from './data/specialty.data'
import { SpecialtyService } from 'src/specialty/specialty.service'
import { clinics } from './data/clinic.data'
import { ClinicService } from 'src/clinic/clinic.service'
import { hospitals } from './data/hospital.data'
import { HospitalService } from 'src/hospital/hospital.service'

@Injectable()
export class InitService {
  constructor(
    @InjectRepository(InitStatus)
    private readonly initStatusRepository: Repository<InitStatus>,
    private readonly cityService: CityService,
    private readonly countryService: CountryService,
    private readonly phoneCodeService: PhoneCodeService,
    private readonly stateService: StateService,
    private readonly specialtyService: SpecialtyService,
    private readonly clinicService: ClinicService,
    private readonly hospitalService: HospitalService
  ) {}

  private readonly logger = new Logger(InitService.name)

  async initialize() {
    const status = await this.initStatusRepository.findOne({ where: { id: 1 } })

    if (status && status.initialized) {
      return
    }

    // Initialize your data
    await this.createAddressData()
    await this.createSpecialtyData()
    await this.createClinicData()
    await this.createHospitalData()

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
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async createSpecialtyData() {
    try {
      const specialtyPromises = specialties.map((specialty) =>
        this.specialtyService.create(specialty)
      )

      await Promise.all(specialtyPromises)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async createClinicData() {
    try {
      const [country, state, city, specialty] = await Promise.all([
        this.countryService.findAll(),
        this.stateService.findAll(),
        this.cityService.findAll(),
        this.specialtyService.findAll()
      ])

      const clinicPromises = clinics.map(
        ({ address, specialtyId, ...clinic }) => {
          address.cityId = city[0].id
          address.stateId = state[0].id
          address.countryId = country[0].id
          specialtyId = specialty[0].id

          return this.clinicService.create({
            ...clinic,
            address,
            specialtyId
          })
        }
      )

      await Promise.all(clinicPromises)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async createHospitalData() {
    try {
      const [country, state, city, specialty] = await Promise.all([
        this.countryService.findAll(),
        this.stateService.findAll(),
        this.cityService.findAll(),
        this.specialtyService.findAll()
      ])

      const hospitalPromises = hospitals.map(
        ({ address, specialtyId, ...hospital }) => {
          address.cityId = city[0].id
          address.stateId = state[0].id
          address.countryId = country[0].id
          specialtyId = specialty[0].id

          return this.hospitalService.create({
            ...hospital,
            address,
            specialtyId
          })
        }
      )

      await Promise.all(hospitalPromises)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
