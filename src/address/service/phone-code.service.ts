import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { PhoneCode } from '../entities/phone-code.entity'
import { Country } from '../entities/country.entity'

@Injectable()
export class PhoneCodeService {
  constructor(
    @InjectRepository(PhoneCode)
    private readonly phoneCodeRepository: Repository<PhoneCode>
  ) {}

  create(code: string, country: Country): Promise<PhoneCode> {
    const phoneCode = this.phoneCodeRepository.create({ code, country })
    return this.phoneCodeRepository.save(phoneCode)
  }

  findById(id: string): Promise<PhoneCode> {
    return this.phoneCodeRepository.findOneBy({ id })
  }
}
