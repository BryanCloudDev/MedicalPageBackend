import { ApiProperty } from '@nestjs/swagger'
import { Status } from 'src/appointment/enums/status-appoinment.enum'

export class AppointmentResponse {
  @ApiProperty({ example: '6383bba1-749d-4b1f-af32-6cc00bca1d95' })
  id: string

  @ApiProperty({ type: Date, example: '2024-04-30T06:00:00.000Z' })
  appointmentDate: Date

  @ApiProperty({ example: 'Example notes from an appointment', nullable: true })
  notes?: string

  @ApiProperty({
    enum: Status,
    example: Status.CREATED
  })
  status: Status
}
