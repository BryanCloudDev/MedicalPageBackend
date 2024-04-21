import { InjectRepository } from '@nestjs/typeorm'
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'
import { CreatePhoneCodeDto } from '../dto/phone-code/create-phone-code.dto'
import { UpdatePhoneCodeDto } from '../dto/phone-code/update-phone-code.dto'
import { currentDate, exceptionHandler } from 'src/common/utils'
import { PhoneCode } from '../entities/phone-code.entity'
import { DbErrorCodes } from 'src/common/enums'

@Injectable()
export class PhoneCodeService {
  constructor(
    @InjectRepository(PhoneCode)
    private readonly phoneCodeRepository: Repository<PhoneCode>,
    private readonly configService: ConfigService
  ) {}

  private readonly logger = new Logger(PhoneCodeService.name)
  private readonly take = this.configService.get('ENTITIES_LIMIT')
  private readonly skip = this.configService.get('ENTITIES_SKIP')

  async create({ code }: CreatePhoneCodeDto): Promise<PhoneCode> {
    try {
      const phoneCodeInstance = this.phoneCodeRepository.create({
        code
      })

      const phoneCode = await this.phoneCodeRepository.save(phoneCodeInstance)
      return phoneCode
    } catch (error) {
      this.duplicityErrorHandler(error, code)
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string): Promise<PhoneCode> {
    try {
      const phoneCode = await this.phoneCodeRepository.findOneBy({ id })

      this.checkIfPhoneCodeExists(id, phoneCode)

      if (phoneCode.deletedOn) {
        throw new BadRequestException(
          `The phone code with id ${id} was deleted`
        )
      }

      return phoneCode
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(
    skip = this.skip,
    take = this.take,
    deleted = false
  ): Promise<PhoneCode[]> {
    try {
      const specialties = await this.phoneCodeRepository.find({
        skip,
        take
      })

      return deleted ? specialties : this.trasformResponse(specialties)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async getAll() {
    try {
      const phoneCodes = await this.phoneCodeRepository.find()

      return phoneCodes
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(
    id: string,
    updatePhoneCodeDto: UpdatePhoneCodeDto
  ): Promise<void> {
    try {
      await this.findById(id)

      await this.phoneCodeRepository.update(id, updatePhoneCodeDto)
    } catch (error) {
      this.duplicityErrorHandler(error, updatePhoneCodeDto.code)
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      const phoneCode = await this.findById(id)

      if (phoneCode.deletedOn) {
        throw new BadRequestException(`Phone Code is already inactive`)
      }

      await this.phoneCodeRepository.update(id, {
        deletedOn: currentDate()
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private checkIfPhoneCodeExists(id: string, specialty: PhoneCode | undefined) {
    if (!specialty) {
      throw new NotFoundException(`The phone code with id ${id} was not found`)
    }
  }

  private trasformResponse(specialties: PhoneCode[]) {
    return specialties
      .filter((specialty) => specialty.deletedOn === null)
      .map((specialty) => {
        delete specialty.deletedOn

        return specialty
      })
  }

  private duplicityErrorHandler(error: any, code: string) {
    if (error.errno === DbErrorCodes.DUPLICATE_ENTRY) {
      throw new BadRequestException(`The phone code ${code} already exists`)
    }
  }
}
