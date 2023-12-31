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
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Patient } from 'src/patient/entities/patient.entity'
import { UserRoles } from '../enums'

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
    const user = req.user as Patient | Doctor

    if (!user) {
      throw new InternalServerErrorException('User not found (request)')
    }

    for (const validRole of validRoles) {
      const userType =
        user instanceof Doctor ? UserRoles.DOCTOR : UserRoles.PATIENT

      if (userType === validRole) {
        return true
      }
    }

    throw new ForbiddenException('You are unathorized')
  }
}
