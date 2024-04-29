import { Type } from 'class-transformer'
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateAppointmentDto {
  @IsDate()
  @Type(() => Date)
  appointmentDate: Date

  @IsString()
  @IsOptional()
  notes?: string

  @IsUUID()
  doctorId: string
}
