import { PartialType } from '@nestjs/mapped-types'
import { CreateAppointmentDto } from './create-appointment.dto'
import { IsEnum } from 'class-validator'
import { Status } from '../enums/status-appoinment.enum'

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @IsEnum(Status)
  status?: string
}
