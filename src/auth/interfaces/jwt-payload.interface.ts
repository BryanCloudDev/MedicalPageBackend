import { UserRoles } from '../enums'

export interface JwtPayload {
  id: string
  role: UserRoles
}
