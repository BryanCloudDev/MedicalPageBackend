import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, ValidateNested, IsString, Matches } from 'class-validator'
import { Schedule, TimeSlot } from '../interfaces'

class CreateTimeSlotDto implements TimeSlot {
  @ApiProperty({ example: '08:00' })
  @IsString()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
  start: string

  @ApiProperty({ example: '17:00' })
  @IsString()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
  end: string
}

export class CreateScheduleDto implements Schedule {
  @ApiProperty({ type: [CreateTimeSlotDto], description: 'Monday schedule' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTimeSlotDto)
  monday: CreateTimeSlotDto[]

  @ApiProperty({ type: [CreateTimeSlotDto], description: 'Tuesday schedule' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTimeSlotDto)
  tuesday: CreateTimeSlotDto[]

  @ApiProperty({ type: [CreateTimeSlotDto], description: 'Wednesday schedule' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTimeSlotDto)
  wednesday: CreateTimeSlotDto[]

  @ApiProperty({ type: [CreateTimeSlotDto], description: 'Thursday schedule' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTimeSlotDto)
  thursday: CreateTimeSlotDto[]

  @ApiProperty({ type: [CreateTimeSlotDto], description: 'Friday schedule' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTimeSlotDto)
  friday: CreateTimeSlotDto[]

  @ApiProperty({ type: [CreateTimeSlotDto], description: 'Saturday schedule' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTimeSlotDto)
  saturday: CreateTimeSlotDto[]

  @ApiProperty({ type: [CreateTimeSlotDto], description: 'Sunday schedule' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTimeSlotDto)
  sunday: CreateTimeSlotDto[]
}
