import { InjectRepository } from '@nestjs/typeorm'
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'
import {
  PaginatedResponse,
  currentDate,
  exceptionHandler,
  pagination
} from 'src/common/utils'
import { City } from '../entities/city.entity'
import { CreateCityDto } from '../dto/city/create-city.dto'
import { StateService } from './state.service'
import { UpdateCityDto } from '../dto/city/update-city.dto'
import { GenericResponse } from 'src/common/interfaces/genericResponse.interface'
import { PaginationDto } from 'src/common/dtos'

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    private readonly configService: ConfigService,
    private readonly stateService: StateService
  ) {}

  private readonly logger = new Logger(CityService.name)
  private readonly take = this.configService.get<number>('ENTITIES_LIMIT')
  private readonly skip = this.configService.get<number>('ENTITIES_SKIP')

  async create(createCityDto: CreateCityDto): Promise<City> {
    try {
      const { name, stateId } = createCityDto
      const state = await this.stateService.findById(stateId)

      const cityInstance = this.cityRepository.create({ name, state })
      const city = await this.cityRepository.save(cityInstance)

      return city
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string): Promise<City> {
    try {
      const city = await this.cityRepository.findOneBy({ id })

      this.checkIfCityExists(id, city)

      if (city.deletedOn) {
        throw new BadRequestException(`The city with id ${id} was deleted`)
      }

      return city
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAllByStateId(
    stateId: string,
    paginationDto: PaginationDto
  ): Promise<PaginatedResponse<City> | GenericResponse<City[]>> {
    const { limit, offset } = paginationDto

    try {
      await this.stateService.findById(stateId)

      if (limit || offset) {
        const take = limit || this.take
        const skip = offset || this.skip

        const response = await pagination<City>({
          repository: this.cityRepository,
          skip,
          take,
          condition: { state: { id: stateId } }
        })

        return response
      }

      const cities = await this.cityRepository.find({
        where: {
          deletedOn: null,
          state: { id: stateId }
        }
      })

      return {
        data: cities
      }
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(id: string, updateCityDto: UpdateCityDto): Promise<void> {
    try {
      await this.findById(id)

      await this.cityRepository.update(id, updateCityDto)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.findById(id)

      await this.cityRepository.update(id, {
        deletedOn: currentDate()
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private checkIfCityExists(id: string, country: City | undefined) {
    if (!country) {
      throw new NotFoundException(`The city with id ${id} was not found`)
    }
  }
}
