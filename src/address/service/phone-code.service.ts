import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, Logger } from '@nestjs/common'
import { Repository } from 'typeorm'
import { PhoneCode } from '../entities/phone-code.entity'
import { Country } from '../entities/country.entity'
import { errorHandler } from 'src/common/utils'

@Injectable()
export class PhoneCodeService {
  constructor(
    @InjectRepository(PhoneCode)
    private readonly phoneCodeRepository: Repository<PhoneCode>
  ) {}

  private readonly logger = new Logger(PhoneCodeService.name)

  async create(code: string, country: Country): Promise<PhoneCode> {
    try {
      const phoneCodeInstance = this.phoneCodeRepository.create({
        code,
        country
      })

      const phoneCode = await this.phoneCodeRepository.save(phoneCodeInstance)
      return phoneCode
    } catch (error) {
      errorHandler(this.logger, error)
    }
  }

  async findById(id: string): Promise<PhoneCode> {
    try {
      const phoneCode = await this.phoneCodeRepository.findOneBy({ id })
      return phoneCode
    } catch (error) {
      errorHandler(this.logger, error)
    }
  }

  async getAll() {
    try {
      const phoneCodes = await this.phoneCodeRepository.find()

      return phoneCodes
    } catch (error) {
      errorHandler(this.logger, error)
    }
  }
}
