import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto'
import { AddressService, PhoneCodeService } from 'src/address/service'
import { Patient } from 'src/patient/entities/patient.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly phoneCodeService: PhoneCodeService,
    private readonly addressService: AddressService
  ) {}

  private readonly logger = new Logger(AuthService.name)

  async registerUser(createPatientDto: CreatePatientDto) {
    try {
      const { address, mobilePhone, ...patientPartial } = createPatientDto
      const { areaCodeId, number } = mobilePhone

      const phoneCode = await this.phoneCodeService.findById(
        mobilePhone.areaCodeId
      )

      if (!phoneCode) {
        throw new NotFoundException(
          `Phone code with id ${areaCodeId} was not found`
        )
      }

      const addressInstance = await this.addressService.create(address)

      const patientInstance = this.patientRepository.create({
        ...patientPartial,
        address: addressInstance,
        mobilePhone: number,
        phoneCode
      })

      return this.patientRepository.save(patientInstance)
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Check server logs')
    }
  }
}
