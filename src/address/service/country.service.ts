import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Country } from '../entities/country.entity'
import {
  PaginatedResponse,
  currentDate,
  exceptionHandler,
  pagination
} from 'src/common/utils'
import { CreateCountryDto } from '../dto/country/create-country.dto'
import { ConfigService } from '@nestjs/config'
import { UpdateCountryDto } from '../dto/country/update-country.dto'
import { PaginationDto } from 'src/common/dtos'
import { GenericResponse } from 'src/common/interfaces/genericResponse.interface'

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    private readonly configService: ConfigService
  ) {}

  private readonly logger = new Logger(CountryService.name)
  private readonly take = this.configService.get<number>('ENTITIES_LIMIT')
  private readonly skip = this.configService.get<number>('ENTITIES_SKIP')

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

  async findCountryWithRelations(
    countryId: string,
    stateId: string,
    cityId: string
  ): Promise<Country> {
    const country = await this.countryRepository.findOne({
      where: {
        deletedOn: null,
        id: countryId,
        states: { id: stateId, cities: { id: cityId } }
      },
      relations: ['states', 'states.cities']
    })

    return country
  }

  async findAll(
    paginationDto?: PaginationDto
  ): Promise<PaginatedResponse<Country> | GenericResponse<Country[]>> {
    const { limit, offset } = paginationDto

    try {
      if (limit || offset) {
        const take = limit || this.take
        const skip = offset || this.skip

        const response = await pagination<Country>({
          repository: this.countryRepository,
          skip,
          take
        })

        return response
      }

      const countries = await this.countryRepository.find({
        where: {
          deletedOn: null
        }
      })

      return {
        data: countries
      }
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

  private checkIfCountryExists(id: string, country: Country | undefined) {
    if (!country) {
      throw new NotFoundException(`The country with id ${id} was not found`)
    }
  }
}
