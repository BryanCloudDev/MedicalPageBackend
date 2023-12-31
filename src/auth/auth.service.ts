import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto'
import { AddressService, PhoneCodeService } from 'src/address/service'
import { Patient } from 'src/patient/entities/patient.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { JwtPayload, Token } from './interfaces'
import { currentDate } from 'src/common/utils'
import { UserRepository } from './types'
import { LoginUserDto } from './dto'
import { compareSync } from 'bcrypt'
import { UserRoles } from './enums'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly phoneCodeService: PhoneCodeService,
    private readonly addressService: AddressService,
    private readonly jwtService: JwtService
  ) {}

  private readonly logger = new Logger(AuthService.name)

  async registerPatient(createPatientDto: CreatePatientDto) {
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

  async loginPatient(loginUserDto: LoginUserDto) {
    const token = await this.loginUser(
      loginUserDto,
      this.patientRepository,
      UserRoles.PATIENT
    )

    return token
  }

  async loginDoctor(loginUserDto: LoginUserDto) {
    const token = await this.loginUser(
      loginUserDto,
      this.doctorRepository,
      UserRoles.DOCTOR
    )

    return token
  }

  private async loginUser(
    { password, email }: LoginUserDto,
    userRepository: UserRepository,
    role: UserRoles
  ): Promise<Token> {
    let user: Patient | Doctor

    try {
      user = await userRepository.findOne({
        where: { email },
        select: { password: true, id: true }
      })
    } catch (error) {}

    if (!user || !compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid')
    }

    const { id } = user

    try {
      await userRepository.update(id, { lastLoginOn: currentDate() })
    } catch (error) {}

    return {
      token: this.getJwtToken({ id, role })
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload)

    return token
  }
}
