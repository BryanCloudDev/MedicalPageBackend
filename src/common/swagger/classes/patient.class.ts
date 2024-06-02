import { ApiProperty } from '@nestjs/swagger'
import { UserResponse } from './user.class'

export class PatientUserResponse {
  @ApiProperty({
    description: 'Patient ID',
    example: '2102796e-d83c-4c01-ae28-fa92dea29040'
  })
  id: string

  @ApiProperty({
    description: 'The date when the patient record was deleted',
    example: '2021-02-01T12:00:00.000Z'
  })
  deletedOn: Date
}

export class PatientResponse extends UserResponse {
  @ApiProperty({
    description: 'The patient data',
    type: PatientUserResponse
  })
  patient: PatientUserResponse
}
