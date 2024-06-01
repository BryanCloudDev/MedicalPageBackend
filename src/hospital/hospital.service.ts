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
import { exceptionHandler, currentDate } from 'src/common/utils'
import { AddressService } from 'src/address/service'
import { SpecialtyService } from 'src/specialty/specialty.service'

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
  private readonly take = this.configService.get('ENTITIES_LIMIT')
  private readonly skip = this.configService.get('ENTITIES_SKIP')

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

  async findAll(skip = this.skip, take = this.take, deleted = false) {
    try {
      const hospitals = await this.hospitalRepository.find({
        skip,
        take
      })

      return deleted ? hospitals : this.trasformResponse(hospitals)
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
