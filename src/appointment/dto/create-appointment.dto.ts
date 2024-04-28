import { Type } from 'class-transformer'
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator'
import { IsLaterThan } from 'src/common/decorators'

export class CreateAppointmentDto {
  @IsDate()
  @IsLaterThan()
  @Type(() => Date)
  appointmentDate: Date

  @IsString()
  @IsOptional()
  notes?: string

  @IsUUID()
  doctorId: string
}
