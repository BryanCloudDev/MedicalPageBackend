import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { CreateClinicDto } from './dto/create-clinic.dto'
import { UpdateClinicDto } from './dto/update-clinic.dto'
import { Clinic } from './entities/clinic.entity'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { AddressService } from 'src/address/service'
import {
  exceptionHandler,
  currentDate,
  pagination,
  PaginatedResponse
} from 'src/common/utils'
import { Repository } from 'typeorm'
import { SpecialtyService } from 'src/specialty/specialty.service'
import { Specialty } from 'src/specialty/entities/specialty.entity'
import { PaginationDto } from 'src/common/dtos'
import { GenericResponse } from 'src/common/interfaces/genericResponse.interface'

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
    private readonly configService: ConfigService,
    private readonly addressService: AddressService,
    private readonly specialtyService: SpecialtyService
  ) {}

  private readonly logger = new Logger(ClinicService.name)
  private readonly take = this.configService.get<number>('ENTITIES_LIMIT')
  private readonly skip = this.configService.get<number>('ENTITIES_SKIP')

  async create({
    address: addressDto,
    specialtyId,
    ...createClinicDto
  }: CreateClinicDto) {
    try {
      const address = await this.addressService.create(addressDto)
      const specialty = await this.specialtyService.findById(specialtyId)

      const clinicInstance = this.clinicRepository.create({
        address,
        specialty,
        ...createClinicDto
      })

      await this.clinicRepository.save(clinicInstance)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(
    paginationDto?: PaginationDto
  ): Promise<PaginatedResponse<Clinic> | GenericResponse<Clinic[]>> {
    const { limit, offset } = paginationDto

    try {
      if (limit || offset) {
        const take = limit || this.take
        const skip = offset || this.skip

        const response = await pagination<Clinic>({
          repository: this.clinicRepository,
          skip,
          take
        })

        return response
      }

      const clinics = await this.clinicRepository.find({
        where: {
          deletedOn: null
        }
      })

      return {
        data: clinics
      }
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string) {
    try {
      const clinic = await this.clinicRepository.findOneBy({ id })

      this.checkIfClinicExists(id, clinic)

      if (clinic.deletedOn) {
        throw new BadRequestException(`The clinic with id ${id} was deleted`)
      }

      return clinic
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(
    id: string,
    { name, specialtyId, ...updateClinicDto }: UpdateClinicDto
  ) {
    try {
      delete updateClinicDto.address

      const partialAddress: { name: string; specialty?: Specialty } = {
        name
      }

      await this.findById(id)

      if (specialtyId) {
        const specialty = await this.specialtyService.findById(specialtyId)
        partialAddress.specialty = specialty
      }

      await this.clinicRepository.update(id, partialAddress)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string) {
    try {
      await this.findById(id)

      await this.clinicRepository.update(id, {
        deletedOn: currentDate()
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private checkIfClinicExists(id: string, specialty: Clinic | undefined) {
    if (!specialty) {
      throw new NotFoundException(`The clinic with id ${id} was not found`)
    }
  }

  private trasformResponse(clinics: Clinic[]) {
    return clinics
      .filter((clinic) => clinic.deletedOn === null)
      .map((clinic) => {
        delete clinic.deletedOn

        return clinic
      })
  }
}
