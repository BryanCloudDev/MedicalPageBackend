import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { City } from '../entities/city.entity'
import { State } from '../entities/state.entity'

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>
  ) {}

  create(name: string, state: State): Promise<City> {
    const city = this.cityRepository.create({ name, state })
    return this.cityRepository.save(city)
  }

  findById(id: string): Promise<City> {
    return this.cityRepository.findOneBy({ id })
  }
}
