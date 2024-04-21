import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { CreateSponsorLevelDto } from './dto/create-sponsor-level.dto'
import { UpdateSponsorLevelDto } from './dto/update-sponsor-level.dto'
import { SponsorLevel } from './entities/sponsor-level.entity'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { currentDate, exceptionHandler } from 'src/common/utils'

@Injectable()
export class SponsorLevelService {
  constructor(
    @InjectRepository(SponsorLevel)
    private readonly sponsorLevelRepository: Repository<SponsorLevel>,
    private readonly configService: ConfigService
  ) {}

  private readonly logger = new Logger(SponsorLevelService.name)
  private readonly take = this.configService.get('ENTITIES_LIMIT')
  private readonly skip = this.configService.get('ENTITIES_SKIP')

  async create(createSponsorLevelDto: CreateSponsorLevelDto) {
    try {
      const sponsorLevelInstance = this.sponsorLevelRepository.create({
        ...createSponsorLevelDto
      })

      const sponsorLevel =
        await this.sponsorLevelRepository.save(sponsorLevelInstance)

      return sponsorLevel
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(skip = this.skip, take = this.take, deleted = false) {
    try {
      const sponsorLevels = await this.sponsorLevelRepository.find({
        skip,
        take
      })

      return deleted ? sponsorLevels : this.trasformResponse(sponsorLevels)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string) {
    try {
      const sponsorLevel = await this.sponsorLevelRepository.findOneBy({ id })

      this.checkIfSponsorLevelExists(id, sponsorLevel)

      if (sponsorLevel.deletedOn) {
        throw new BadRequestException(
          `The sponsor level with id ${id} was deleted`
        )
      }

      return sponsorLevel
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(id: string, updateSponsorLevelDto: UpdateSponsorLevelDto) {
    try {
      await this.findById(id)

      await this.sponsorLevelRepository.update(id, updateSponsorLevelDto)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string) {
    try {
      const specialty = await this.findById(id)

      if (specialty.deletedOn) {
        throw new BadRequestException(`Sponsor Level is already inactive`)
      }

      await this.sponsorLevelRepository.update(id, {
        deletedOn: currentDate()
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private trasformResponse(sponsorLevels: SponsorLevel[]) {
    return sponsorLevels
      .filter((sponsorLevel) => sponsorLevel.deletedOn === null)
      .map((sponsorLevel) => {
        delete sponsorLevel.deletedOn

        return sponsorLevel
      })
  }

  private checkIfSponsorLevelExists(
    id: string,
    specialty: SponsorLevel | undefined
  ) {
    if (!specialty) {
      throw new NotFoundException(`The specialty with id ${id} was not found`)
    }
  }
}
