import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, Logger } from '@nestjs/common'
import { Repository } from 'typeorm'
import { State } from '../entities/state.entity'
import { Country } from '../entities/country.entity'
import { exceptionHandler } from 'src/common/utils'

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>
  ) {}

  private readonly logger = new Logger(StateService.name)

  async create(name: string, country: Country): Promise<State> {
    try {
      const stateInstance = this.stateRepository.create({ name, country })
      const state = await this.stateRepository.save(stateInstance)

      return state
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string): Promise<State> {
    try {
      const state = await this.stateRepository.findOneBy({ id })

      return state
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
