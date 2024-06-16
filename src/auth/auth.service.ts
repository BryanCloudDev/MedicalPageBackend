import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { AddressService, PhoneCodeService } from 'src/address/service'
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto'
import { currentDate, exceptionHandler } from 'src/common/utils'
import { PatientService } from 'src/patient/patient.service'
import { JwtPayload, Token } from './interfaces'
import { Roles } from 'src/user/enums'
import { LoginUserDto } from './dto'
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto'
import { DoctorService } from 'src/doctor/doctor.service'
import { SpecialtyService } from 'src/specialty/specialty.service'
import { UserService } from 'src/user/user.service'
import { CreateAdministratorDto } from 'src/administrator/dto/create-administrator.dto'
import { AdministratorService } from 'src/administrator/administrator.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly addressService: AddressService,
    private readonly administratorService: AdministratorService,
    private readonly doctorService: DoctorService,
    private readonly jwtService: JwtService,
    private readonly patientService: PatientService,
    private readonly phoneCodeService: PhoneCodeService,
    private readonly specialtyService: SpecialtyService,
    private readonly userService: UserService
  ) {}

  private readonly logger = new Logger(AuthService.name)

  async registerPatient(createPatientDto: CreatePatientDto) {
    const {
      address: addressDto,
      regionNumberId,
      ...patientPartial
    } = createPatientDto

    try {
      const regionNumber = await this.phoneCodeService.findById(regionNumberId)

      const address = await this.addressService.create(addressDto)

      const user = await this.userService.create(
        patientPartial,
        regionNumber,
        address,
        Roles.PATIENT
      )

      await this.patientService.create(user)

      return {
        token: this.getJwtToken({ id: user.id })
      }
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async registerDoctor(createDoctorDto: CreateDoctorDto) {
    const {
      address: addressDto,
      regionNumberId,
      specialtyId,
      ...doctorPartial
    } = createDoctorDto

    try {
      const regionNumber = await this.phoneCodeService.findById(regionNumberId)

      const address = await this.addressService.create(addressDto)

      const specialty = await this.specialtyService.findById(specialtyId)

      const user = await this.userService.create(
        doctorPartial,
        regionNumber,
        address,
        Roles.DOCTOR
      )

      await this.doctorService.create(user, specialty, createDoctorDto)

      return {
        token: this.getJwtToken({ id: user.id })
      }
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async registerAdministrator(createAdministratorDto: CreateAdministratorDto) {
    const { regionNumberId, ...administratorPartial } = createAdministratorDto

    try {
      const regionNumber = await this.phoneCodeService.findById(regionNumberId)

      const user = await this.userService.create(
        administratorPartial,
        regionNumber,
        null,
        Roles.ADMINISTRATOR
      )

      await this.administratorService.create(user)

      return {
        token: this.getJwtToken({ id: user.id })
      }
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async loginUser({ password, email }: LoginUserDto): Promise<Token> {
    try {
      const user = await this.userService.findByEmailWithPassword(email)

      if (!user || !compareSync(password, user.password)) {
        throw new UnauthorizedException('Credentials are not valid')
      }

      if (!user.isActive) {
        throw new BadRequestException(
          'User disabled, please contact the administrator'
        )
      }

      const { id } = user

      await this.userService.updateById(id, { lastLoginOn: currentDate() })

      return {
        token: this.getJwtToken({ id })
      }
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload)

    return token
  }
}
