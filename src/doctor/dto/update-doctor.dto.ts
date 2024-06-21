import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsString,
  IsNumberString,
  Length,
  ValidateNested,
  IsNotEmptyObject,
  IsUUID
} from 'class-validator'
import { CreateScheduleDto } from 'src/common/dtos/schedule.dto'
import { UpdateUserDto } from 'src/user/dto/update-user.dto'
import { IsValidPhoneNumber } from 'src/common/decorators'

export class UpdateDoctorDto extends PartialType(UpdateUserDto) {
  @ApiProperty({
    example: '70707070',
    description: 'Office phone number'
  })
  @IsString()
  @IsValidPhoneNumber()
  officePhoneNumber?: string

  @ApiProperty({
    example: '1555',
    description: 'JVPM number of the doctor',
    minimum: 3,
    maximum: 15
  })
  @IsNumberString()
  @Length(3, 15)
  jvpmNumber?: string

  @ApiProperty({ type: CreateScheduleDto, description: 'Schedule' })
  @ValidateNested({ each: true })
  @Type(() => CreateScheduleDto)
  @IsNotEmptyObject()
  schedule?: CreateScheduleDto

  @ApiProperty({
    example: 'f0b1b4b4-0b1b-4b4b-0b1b-4b4b0b1b4b4b',
    description: 'Specialty ID'
  })
  @IsUUID()
  specialtyId?: string
}
