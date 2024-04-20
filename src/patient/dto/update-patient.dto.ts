import { PartialType } from '@nestjs/mapped-types'
import { UpdateUserDto } from 'src/user/dto/update-user.dto'

export class UpdatePatientDto extends PartialType(UpdateUserDto) {}
