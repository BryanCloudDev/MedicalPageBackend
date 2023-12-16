import { PartialType } from '@nestjs/mapped-types'
import { CreateSponsorLevelDto } from './create-sponsor-level.dto'

export class UpdateSponsorLevelDto extends PartialType(CreateSponsorLevelDto) {}
