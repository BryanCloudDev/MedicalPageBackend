import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Country } from '../entities/country.entity'
import { exceptionHandler } from 'src/common/utils'

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>
  ) {}

  private readonly logger = new Logger(CountryService.name)

  async create(name: string): Promise<Country> {
    try {
      const countryInstance = this.countryRepository.create({ name })
      const country = await this.countryRepository.save(countryInstance)

      return country
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string): Promise<Country> {
    try {
      const country = await this.countryRepository.findOneBy({ id })

      return country
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async getAll() {
    try {
      const countries = await this.countryRepository.find({
        relations: { states: { cities: true } }
      })

      return countries
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
