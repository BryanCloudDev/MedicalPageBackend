import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/user/user.service'
import { JwtPayload } from '../interfaces'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: JwtPayload) {
    const { id } = payload

    let user: User

    try {
      user = await this.userService.findById(id)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }

    if (!user) {
      throw new UnauthorizedException('Token is not valid')
    }

    if (user.deletedOn) {
      throw new UnauthorizedException(
        'User is inactive, contact the administrator'
      )
    }

    return user
  }
}
