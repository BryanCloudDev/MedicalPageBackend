import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler()
    )

    if (!validRoles || validRoles.length === 0) {
      return true
    }

    const req = context.switchToHttp().getRequest()
    const user = req.user as User

    if (!user) {
      throw new InternalServerErrorException('User not found (request)')
    }

    const userRole = user.role
    if (validRoles.includes(userRole)) {
      return true
    }

    throw new ForbiddenException('You are unathorized')
  }
}
