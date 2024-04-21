import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Country } from '../entities/country.entity'
import { currentDate, exceptionHandler } from 'src/common/utils'
import { CreateCountryDto } from '../dto/country/create-country.dto'
import { ConfigService } from '@nestjs/config'
import { UpdateCountryDto } from '../dto/country/update-country.dto'

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    private readonly configService: ConfigService
  ) {}

  private readonly logger = new Logger(CountryService.name)
  private readonly take = this.configService.get('ENTITIES_LIMIT')
  private readonly skip = this.configService.get('ENTITIES_SKIP')

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    try {
      const countryInstance = this.countryRepository.create({
        ...createCountryDto
      })
      const country = await this.countryRepository.save(countryInstance)

      return country
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string): Promise<Country> {
    try {
      const country = await this.countryRepository.findOneBy({ id })

      this.checkIfCountryExists(id, country)

      if (country.deletedOn) {
        throw new BadRequestException(`The country with id ${id} was deleted`)
      }

      return country
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(skip = this.skip, take = this.take, deleted = false) {
    try {
      const countries = await this.countryRepository.find({ skip, take })

      return deleted ? countries : this.trasformResponse(countries)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(
    id: string,
    updateCountryDto: UpdateCountryDto
  ): Promise<void> {
    try {
      await this.findById(id)

      await this.countryRepository.update(id, updateCountryDto)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.findById(id)

      await this.countryRepository.update(id, {
        deletedOn: currentDate()
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private trasformResponse(countries: Country[]) {
    return countries
      .filter((country) => country.deletedOn === null)
      .map((country) => {
        delete country.deletedOn

        return country
      })
  }

  private checkIfCountryExists(id: string, country: Country | undefined) {
    if (!country) {
      throw new NotFoundException(`The country with id ${id} was not found`)
    }
  }
}
