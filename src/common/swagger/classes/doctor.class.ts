import { ApiProperty } from '@nestjs/swagger'
import { UserResponse } from './user.class'
import { CreateScheduleDto } from 'src/common/dtos/schedule.dto'

class DoctorUserResponse {
  @ApiProperty({
    description: 'The unique identifier of the doctor',
    example: '2102796e-d83c-4c01-ae28-fa92dea29040'
  })
  id: string

  @ApiProperty({
    description: 'The date when the doctor record was deleted',
    example: null
  })
  deletedOn: Date

  @ApiProperty({
    description: 'The office phone number of the doctor',
    example: '25252525'
  })
  officePhoneNumber: string

  @ApiProperty({
    description: 'The JVPM number of the doctor',
    example: '7289'
  })
  jvpmNumber: string

  @ApiProperty({
    description: 'Indicates if the doctor is a sponsor or not',
    example: false
  })
  isSponsor: boolean

  @ApiProperty({
    description: 'The start date of the sponsorship',
    example: '2021-02-01T12:00:00.000Z',
    type: Date
  })
  startDateSponsor: Date

  @ApiProperty({ type: CreateScheduleDto, description: 'Schedule' })
  schedule: CreateScheduleDto
}

export class DoctorResponse extends UserResponse {
  @ApiProperty({
    description: 'The doctor data',
    type: DoctorUserResponse
  })
  doctor: DoctorUserResponse
}
