import { InjectRepository } from '@nestjs/typeorm'
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'
import { CreateAddressDto } from '../dto/address/create-address.dto'
import { UpdateAddressDto } from '../dto/address/update-address.dto'
import { Address } from '../entities/address.entity'
import {
  PaginatedResponse,
  currentDate,
  exceptionHandler,
  pagination
} from 'src/common/utils'
import { CountryService } from './country.service'
import { StateService } from './state.service'
import { CityService } from './city.service'
import { PaginationDto } from 'src/common/dtos'
import { GenericResponse } from 'src/common/interfaces/genericResponse.interface'

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly countryService: CountryService,
    private readonly configService: ConfigService,
    private readonly stateService: StateService,
    private readonly cityService: CityService
  ) {}

  private readonly logger = new Logger(AddressService.name)
  private readonly take = this.configService.get<number>('ENTITIES_LIMIT')
  private readonly skip = this.configService.get<number>('ENTITIES_SKIP')

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    try {
      const { countryId, stateId, cityId, ...partialAddress } = createAddressDto

      const countryPromise = this.countryService.findById(countryId)
      const statePromise = this.stateService.findById(stateId)
      const cityPromise = this.cityService.findById(cityId)

      const [country, state, city] = await Promise.all([
        countryPromise,
        statePromise,
        cityPromise
      ])

      const addressInstance = this.addressRepository.create({
        ...partialAddress,
        country,
        state,
        city
      })

      const address = await this.addressRepository.save(addressInstance)

      return address
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string): Promise<Address> {
    try {
      const address = await this.addressRepository.findOneBy({ id })

      this.checkIfAddressExists(id, address)

      if (address.deletedOn) {
        throw new BadRequestException(`The address with id ${id} was deleted`)
      }

      return address
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(
    paginationDto: PaginationDto
  ): Promise<PaginatedResponse<Address> | GenericResponse<Address[]>> {
    const { limit, offset } = paginationDto
    try {
      if (limit || offset) {
        const take = limit || this.take
        const skip = offset || this.skip

        const response = await pagination<Address>({
          repository: this.addressRepository,
          skip,
          take
        })

        return response
      }

      const addresses = await this.addressRepository.find({
        where: {
          deletedOn: null
        }
      })

      return {
        data: addresses
      }
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(
    id: string,
    updateAddressDto: UpdateAddressDto
  ): Promise<void> {
    try {
      const { countryId, stateId, cityId, ...partialAddress } = updateAddressDto

      const addressPromise = this.addressRepository.findOneBy({
        id
      })

      const countryPromise = this.countryService.findById(countryId)
      const statePromise = this.stateService.findById(stateId)
      const cityPromise = this.cityService.findById(cityId)

      const [address, country, state, city] = await Promise.all([
        addressPromise,
        countryPromise,
        statePromise,
        cityPromise
      ])

      await this.addressRepository.update(id, {
        ...address,
        ...partialAddress,
        country,
        state,
        city
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.findById(id)

      await this.addressRepository.update(id, {
        deletedOn: currentDate()
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private checkIfAddressExists(id: string, address: Address) {
    if (!address) {
      throw new NotFoundException(`The address with id ${id} was not found`)
    }
  }
}
