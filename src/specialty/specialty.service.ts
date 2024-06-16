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
import {
  PaginatedResponse,
  currentDate,
  exceptionHandler,
  pagination
} from 'src/common/utils'
import { PaginationDto } from 'src/common/dtos'
import { GenericResponse } from 'src/common/interfaces/genericResponse.interface'

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,
    private readonly configService: ConfigService
  ) {}

  private readonly logger = new Logger(SpecialtyService.name)
  private readonly take = this.configService.get<number>('ENTITIES_LIMIT')
  private readonly skip = this.configService.get<number>('ENTITIES_SKIP')

  async create(createSpecialtyDto: CreateSpecialtyDto): Promise<void> {
    try {
      const specialtyInstance = this.specialtyRepository.create({
        ...createSpecialtyDto
      })
      await this.specialtyRepository.save(specialtyInstance)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(
    paginationDto?: PaginationDto
  ): Promise<PaginatedResponse<Specialty> | GenericResponse<Specialty[]>> {
    const { limit, offset } = paginationDto

    try {
      if (limit || offset) {
        const take = limit || this.take
        const skip = offset || this.skip

        const response = await pagination<Specialty>({
          repository: this.specialtyRepository,
          skip,
          take
        })

        return response
      }

      const specialties = await this.specialtyRepository.find({
        where: {
          deletedOn: null
        }
      })

      return {
        data: specialties
      }
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
