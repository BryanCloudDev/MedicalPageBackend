import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateAppointmentDto {
  @ApiProperty({ type: Date, example: '2024-06-30T09:00:00.000Z' })
  @IsDate()
  @Type(() => Date)
  appointmentDate: Date

  @ApiProperty({
    type: String,
    required: false,
    example: 'Bring your medical reports'
  })
  @IsString()
  @IsOptional()
  notes?: string

  @ApiProperty({
    type: String,
    example: 'f09fdcc9-0d71-402b-af5a-0b5f60793cb0'
  })
  @IsUUID()
  doctorId: string
}
