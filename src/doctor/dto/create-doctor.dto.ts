import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsString, IsUUID, Length } from 'class-validator'
import { IsValidPhoneNumber } from 'src/common/decorators'
import { CreateUserDto } from 'src/user/dto/create-user.dto'

export class CreateDoctorDto extends CreateUserDto {
  @ApiProperty({
    example: '1555',
    description: 'JVPM number of the doctor',
    minimum: 3,
    maximum: 15
  })
  @IsNumberString()
  @Length(3, 15)
  jvpmNumber: string

  @ApiProperty({
    example: 'f0b1b4b4-0b1b-4b4b-0b1b-4b4b0b1b4b4b',
    description: 'Specialty ID'
  })
  @IsUUID()
  specialtyId: string

  @ApiProperty({
    example: '70707070',
    description: 'Office phone number'
  })
  @IsString()
  @IsValidPhoneNumber()
  officePhoneNumber: string
}
