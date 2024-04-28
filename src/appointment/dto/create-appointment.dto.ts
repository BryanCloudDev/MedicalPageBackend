import { Type } from 'class-transformer'
import { IsDate, IsOptional, IsString } from 'class-validator'
import { IsLaterThan } from 'src/common/decorators'

export class CreateAppointmentDto {
  @IsDate()
  @IsLaterThan()
  @Type(() => Date)
  appointmentDate: Date

  @IsString()
  @IsOptional()
  notes?: string
}
