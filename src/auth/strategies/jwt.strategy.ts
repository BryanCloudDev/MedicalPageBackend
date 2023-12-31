import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Patient } from 'src/patient/entities/patient.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { User } from '../../common/entities/user.entity'
import { JwtPayload } from '../interfaces'
import { UserRoles } from '../enums'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: JwtPayload) {
    const { id, role } = payload

    let user: Doctor | User

    if (role === UserRoles.PATIENT) {
      user = await this.patientRepository.findOneBy({ id })
    }

    if (role === UserRoles.DOCTOR) {
      user = await this.doctorRepository.findOneBy({ id })
    }

    if (!user) {
      throw new UnauthorizedException('Token is not valid')
    }

    if (user.deletedOn) {
      throw new UnauthorizedException('User is inactive')
    }

    return user
  }
}
