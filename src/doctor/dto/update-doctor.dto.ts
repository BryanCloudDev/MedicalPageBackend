import { PartialType } from '@nestjs/swagger'
import { UpdateUserDto } from 'src/user/dto/update-user.dto'

export class UpdateDoctorDto extends PartialType(UpdateUserDto) {}
