import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'

import { CreateSpecialtyDto } from './dto/create-specialty.dto'
import { UpdateSpecialtyDto } from './dto/update-specialty.dto'
import { Specialty } from './entities/specialty.entity'
import { currentDate, exceptionHandler } from 'src/common/utils'

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,
    private readonly configService: ConfigService
  ) {}

  private readonly logger = new Logger(SpecialtyService.name)
  private readonly take = this.configService.get('ENTITIES_LIMIT')
  private readonly skip = this.configService.get('ENTITIES_SKIP')

  async create(createSpecialtyDto: CreateSpecialtyDto): Promise<Specialty> {
    try {
      const specialtyInstance = this.specialtyRepository.create({
        ...createSpecialtyDto
      })
      const specialty = await this.specialtyRepository.save(specialtyInstance)

      return specialty
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(
    skip = this.skip,
    take = this.take,
    deleted = false
  ): Promise<Specialty[]> {
    try {
      const specialties = await this.specialtyRepository.find({
        skip,
        take
      })

      return deleted ? specialties : this.trasformResponse(specialties)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string): Promise<Specialty> {
    try {
      const specialty = await this.specialtyRepository.findOneBy({ id })

      this.checkIfSpecialtyExists(id, specialty)

      if (specialty.deletedOn) {
        throw new BadRequestException(`The specialty with id ${id} was deleted`)
      }

      return specialty
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(
    id: string,
    updateSpecialtyDto: UpdateSpecialtyDto
  ): Promise<void> {
    try {
      await this.findById(id)

      await this.specialtyRepository.update(id, updateSpecialtyDto)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      const specialty = await this.findById(id)

      if (specialty.deletedOn) {
        throw new BadRequestException(`Specialty is already inactive`)
      }

      await this.specialtyRepository.update(id, {
        deletedOn: currentDate()
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private checkIfSpecialtyExists(id: string, specialty: Specialty | undefined) {
    if (!specialty) {
      throw new NotFoundException(`The specialty with id ${id} was not found`)
    }
  }

  private trasformResponse(specialties: Specialty[]) {
    return specialties
      .filter((specialty) => specialty.deletedOn === null)
      .map((specialty) => {
        delete specialty.deletedOn

        return specialty
      })
  }
}
