import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsPositive, Min } from 'class-validator'

export class PaginationDto {
  @ApiProperty({
    minimum: 1,
    required: false
  })
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  limit?: number

  @ApiProperty({
    minimum: 0,
    required: false
  })
  @IsOptional()
  @Type(() => Number)
  offset?: number
}
