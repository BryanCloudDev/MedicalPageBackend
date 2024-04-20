import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { compareSync } from 'bcrypt'
import { AddressService, PhoneCodeService } from 'src/address/service'
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto'
import { currentDate, exceptionHandler } from 'src/common/utils'
import { PatientService } from 'src/patient/patient.service'
import { User } from 'src/user/entities/user.entity'
import { JwtPayload, Token } from './interfaces'
import { Roles } from 'src/user/enums'
import { LoginUserDto } from './dto'

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
    const { regionNumberId, number } = mobilePhone

    try {
      const phoneCode = await this.phoneCodeService.findById(regionNumberId)

      if (!phoneCode) {
        throw new NotFoundException(
          `Phone code with id ${regionNumberId} was not found`
        )
      }

      const address = await this.addressService.create(addressDto)

      const userInstance = this.userRepository.create({
        ...patientPartial,
        mobilePhone: number,
        role: Roles.PATIENT,
        phoneCode,
        address,
        patient: {}
      })

      const user = await this.userRepository.save(userInstance)

      await this.patientService.create(user)

      return {
        token: this.getJwtToken({ id: user.id })
      }
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async loginUser({ password, email }: LoginUserDto): Promise<Token> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: { password: true, id: true }
      })

      if (!user || !compareSync(password, user.password)) {
        throw new UnauthorizedException('Credentials are not valid')
      }

      if (!user.isActive) {
        throw new BadRequestException(
          'User disabled, please contact the administrator'
        )
      }

      const { id } = user

      await this.userRepository.update(id, { lastLoginOn: currentDate() })

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
