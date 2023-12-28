import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { Repository } from 'typeorm'
import { Patient } from './entities/patient.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { AddressService } from '../address/service/address.service'
import { PhoneCodeService } from 'src/address/service'
import { FileService } from 'src/file/file.service'

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly phoneCodeService: PhoneCodeService,
    private readonly addressService: AddressService,
    private readonly fileService: FileService
  ) {}
  private readonly logger = new Logger(PatientService.name)

  async create(createPatientDto: CreatePatientDto, photo: Express.Multer.File) {
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

      if (photo) {
        // console.log(await this.fileService.uploadFile('users', photo))
        console.log(photo)
      }

      return this.patientRepository.save(patientInstance)
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Contact the admin')
    }
  }

  findAll() {
    return `This action returns all patient`
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`
  }

  remove(id: number) {
    return `This action removes a #${id} patient`
  }
}
