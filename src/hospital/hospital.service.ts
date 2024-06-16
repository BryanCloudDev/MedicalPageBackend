import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { CreateHospitalDto } from './dto/create-hospital.dto'
import { UpdateHospitalDto } from './dto/update-hospital.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Hospital } from './entities/hospital.entity'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import {
  exceptionHandler,
  currentDate,
  PaginatedResponse,
  pagination
} from 'src/common/utils'
import { AddressService } from 'src/address/service'
import { SpecialtyService } from 'src/specialty/specialty.service'
import { PaginationDto } from 'src/common/dtos'
import { GenericResponse } from 'src/common/interfaces/genericResponse.interface'

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital)
    private readonly hospitalRepository: Repository<Hospital>,
    private readonly configService: ConfigService,
    private readonly addressService: AddressService,
    private readonly specialtyService: SpecialtyService
  ) {}

  private readonly logger = new Logger(HospitalService.name)
  private readonly take = this.configService.get<number>('ENTITIES_LIMIT')
  private readonly skip = this.configService.get<number>('ENTITIES_SKIP')

  async create({
    address: addressDto,
    specialtyId,
    ...createHospitalDto
  }: CreateHospitalDto) {
    try {
      const address = await this.addressService.create(addressDto)
      const specialty = await this.specialtyService.findById(specialtyId)

      const hospitalInstance = this.hospitalRepository.create({
        address,
        specialty,
        ...createHospitalDto
      })

      await this.hospitalRepository.save(hospitalInstance)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(
    paginationDto?: PaginationDto
  ): Promise<PaginatedResponse<Hospital> | GenericResponse<Hospital[]>> {
    const { limit, offset } = paginationDto

    try {
      if (limit || offset) {
        const take = limit || this.take
        const skip = offset || this.skip

        const response = await pagination<Hospital>({
          repository: this.hospitalRepository,
          skip,
          take
        })

        return response
      }

      const hospitals = await this.hospitalRepository.find({
        where: {
          deletedOn: null
        }
      })

      return {
        data: hospitals
      }
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string) {
    try {
      const hospital = await this.hospitalRepository.findOneBy({ id })

      this.checkIfHospitalExists(id, hospital)

      if (hospital.deletedOn) {
        throw new BadRequestException(`The hospital with id ${id} was deleted`)
      }

      return hospital
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(id: string, updateHospitalDto: UpdateHospitalDto) {
    try {
      delete updateHospitalDto.address

      await this.findById(id)

      await this.hospitalRepository.update(id, updateHospitalDto)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string) {
    try {
      await this.findById(id)

      await this.hospitalRepository.update(id, {
        deletedOn: currentDate()
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private checkIfHospitalExists(id: string, specialty: Hospital | undefined) {
    if (!specialty) {
      throw new NotFoundException(`The hospital with id ${id} was not found`)
    }
  }

  private trasformResponse(hospitals: Hospital[]) {
    return hospitals
      .filter((hospital) => hospital.deletedOn === null)
      .map((hospital) => {
        delete hospital.deletedOn

        return hospital
      })
  }
}
