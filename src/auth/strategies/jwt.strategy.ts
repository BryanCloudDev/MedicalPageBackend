import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/user/user.service'
import { exceptionHandler } from 'src/common/utils'
import { JwtPayload } from '../interfaces'

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

  private readonly logger = new Logger(JwtStrategy.name)

  async validate(payload: JwtPayload) {
    try {
      const { id } = payload

      const user = await this.userService.findById(id)

      if (!user) {
        throw new UnauthorizedException('Token is not valid')
      }

      if (user.deletedOn) {
        throw new UnauthorizedException(
          'User is inactive, contact the administrator'
        )
      }

      return user
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
