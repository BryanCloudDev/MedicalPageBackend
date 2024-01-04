import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { compareSync } from 'bcrypt'
import { AddressService, PhoneCodeService } from 'src/address/service'
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto'
import { PhoneCode } from 'src/address/entities/phone-code.entity'
import { User } from 'src/user/entities/user.entity'
import { JwtPayload, Token } from './interfaces'
import {
  currentDate,
  internalServerError,
  notFoundError,
  unauthorizedError
} from 'src/common/utils'
import { Roles } from 'src/user/enums'
import { LoginUserDto } from './dto'
import { PatientService } from 'src/patient/patient.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly phoneCodeService: PhoneCodeService,
    private readonly patientService: PatientService,
    private readonly addressService: AddressService,
    private readonly jwtService: JwtService
  ) {}

  private readonly logger = new Logger(AuthService.name)

  async registerPatient(createPatientDto: CreatePatientDto) {
    const {
      address: addressDto,
      mobilePhone,
      ...patientPartial
    } = createPatientDto
    const { areaCodeId, number } = mobilePhone

    let phoneCode: PhoneCode

    try {
      phoneCode = await this.phoneCodeService.findById(mobilePhone.areaCodeId)
    } catch (error) {
      this.handleErrors(error)
    }

    if (!phoneCode) {
      notFoundError(`Phone code with id ${areaCodeId} was not found`)
    }

    let user: User
    try {
      const address = await this.addressService.create(addressDto)

      const userInstance = this.userRepository.create({
        ...patientPartial,
        mobilePhone: number,
        role: Roles.PATIENT,
        phoneCode,
        address,
        patient: {}
      })

      user = await this.userRepository.save(userInstance)
    } catch (error) {
      this.handleErrors(error)
    }

    try {
      await this.patientService.create(user)
    } catch (error) {
      this.handleErrors(error)
    }

    return {
      token: this.getJwtToken({ id: user.id })
    }
  }

  async loginUser({ password, email }: LoginUserDto): Promise<Token> {
    let user: User

    try {
      user = await this.userRepository.findOne({
        where: { email },
        select: { password: true, id: true }
      })
    } catch (error) {
      this.handleErrors(error)
    }

    if (!user || !compareSync(password, user.password)) {
      unauthorizedError('Credentials are not valid')
    }

    const { id } = user

    try {
      await this.userRepository.update(id, { lastLoginOn: currentDate() })
    } catch (error) {
      this.handleErrors(error)
    }

    return {
      token: this.getJwtToken({ id })
    }
  }

  private handleErrors(error: any) {
    internalServerError(error.message)
    this.logger.error(error)
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload)

    return token
  }
}
