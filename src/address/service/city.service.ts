import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, Logger } from '@nestjs/common'
import { Repository } from 'typeorm'
import { exceptionHandler } from 'src/common/utils'
import { State } from '../entities/state.entity'
import { City } from '../entities/city.entity'

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>
  ) {}

  private readonly logger = new Logger(CityService.name)

  async create(name: string, state: State): Promise<City> {
    try {
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

      return city
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
