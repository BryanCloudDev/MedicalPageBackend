import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Country } from '../entities/country.entity'

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>
  ) {}

  create(name: string): Promise<Country> {
    const city = this.countryRepository.create({ name })
    return this.countryRepository.save(city)
  }

  findById(id: string): Promise<Country> {
    return this.countryRepository.findOneBy({ id })
  }
}
