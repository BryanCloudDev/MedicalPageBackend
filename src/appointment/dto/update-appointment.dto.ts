import { CreateAppointmentDto } from './create-appointment.dto'
import { IsEnum } from 'class-validator'
import { Status } from '../enums/status-appoinment.enum'
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @ApiProperty({ enum: Status, example: 'CANCELLED' })
  @IsEnum(Status)
  status?: Status
}
