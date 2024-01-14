import { IsEnum } from 'class-validator'
import { PaginationDto } from 'src/common/dtos'
import { Roles } from 'src/user/enums'

export class PaginationUserDto extends PaginationDto {
  @IsEnum(Roles)
  role?: Roles
}
