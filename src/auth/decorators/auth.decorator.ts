import { UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserRoleGuard } from '../guards/user-role.guard'
import { RoleProtected } from '.'
import { Roles } from 'src/user/enums'

export function Auth(...roles: Roles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard('jwt'), UserRoleGuard)
  )
}
