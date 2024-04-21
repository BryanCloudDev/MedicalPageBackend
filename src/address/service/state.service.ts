import { InjectRepository } from '@nestjs/typeorm'
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { State } from '../entities/state.entity'
import { currentDate, exceptionHandler } from 'src/common/utils'
import { ConfigService } from '@nestjs/config'
import { CreateStateDto } from '../dto/state/create-state.dto'
import { CountryService } from './country.service'
import { UpdateStateDto } from '../dto/state/update-state.dto'

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    private readonly countryService: CountryService,
    private readonly configService: ConfigService
  ) {}

  private readonly logger = new Logger(StateService.name)
  private readonly take = this.configService.get('ENTITIES_LIMIT')
  private readonly skip = this.configService.get('ENTITIES_SKIP')

  async create(createStateDto: CreateStateDto): Promise<State> {
    try {
      const { name, countryId } = createStateDto
      const country = await this.countryService.findById(countryId)

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

      this.checkIfStateExists(id, state)

      if (state.deletedOn) {
        throw new BadRequestException(`The state with id ${id} was deleted`)
      }

      return state
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(skip = this.skip, take = this.take, deleted = false) {
    try {
      const states = await this.stateRepository.find({ skip, take })

      return deleted ? states : this.trasformResponse(states)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(
    id: string,
    updateCountryDto: UpdateStateDto
  ): Promise<void> {
    try {
      await this.findById(id)

      await this.stateRepository.update(id, updateCountryDto)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.findById(id)

      await this.stateRepository.update(id, {
        deletedOn: currentDate()
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private checkIfStateExists(id: string, state: State | undefined) {
    if (!state) {
      throw new NotFoundException(`The state with id ${id} was not found`)
    }
  }

  private trasformResponse(states: State[]) {
    return states
      .filter((state) => state.deletedOn === null)
      .map((state) => {
        delete state.deletedOn

        return state
      })
  }
}
