import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { State } from '../entities/state.entity'
import { Country } from '../entities/country.entity'

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>
  ) {}

  create(name: string, country: Country): Promise<State> {
    const state = this.stateRepository.create({ name, country })
    return this.stateRepository.save(state)
  }

  findById(id: string): Promise<State> {
    return this.stateRepository.findOneBy({ id })
  }
}
