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
import { compareSync } from 'bcrypt'
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto'
import { AddressService, PhoneCodeService } from 'src/address/service'
import { User } from 'src/user/entities/user.entity'
import { JwtPayload, Token } from './interfaces'
import { currentDate } from 'src/common/utils'
import { Roles } from 'src/user/enums'
import { LoginUserDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly phoneCodeService: PhoneCodeService,
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

    const phoneCode = await this.phoneCodeService.findById(
      mobilePhone.areaCodeId
    )

    if (!phoneCode) {
      throw new NotFoundException(
        `Phone code with id ${areaCodeId} was not found`
      )
    }

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

      return this.userRepository.save(userInstance)
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Check server logs')
    }
  }

  async loginUser({ password, email }: LoginUserDto): Promise<Token> {
    let user: User

    try {
      user = await this.userRepository.findOne({
        where: { email },
        select: { password: true, id: true }
      })
    } catch (error) {}

    if (!user || !compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid')
    }

    const { id } = user

    try {
      await this.userRepository.update(id, { lastLoginOn: currentDate() })
    } catch (error) {}

    return {
      token: this.getJwtToken({ id })
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload)

    return token
  }
}
