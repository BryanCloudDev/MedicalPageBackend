import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator
} from '@nestjs/common'
import { User } from 'src/user/entities/user.entity'

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): string | string[] => {
    const req = ctx.switchToHttp().getRequest()
    const user = req.user as User

    if (!user) {
      throw new InternalServerErrorException('User not found (request)')
    }

    return data ? user[data] : user
  }
)
