import { UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserRoleGuard } from '../guards/user-role.guard'
import { UserRoles } from '../enums'
import { RoleProtected } from '.'

export function Auth(...roles: UserRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard)
  )
}
