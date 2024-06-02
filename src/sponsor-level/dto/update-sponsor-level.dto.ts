import { PartialType } from '@nestjs/swagger'
import { CreateSponsorLevelDto } from './create-sponsor-level.dto'

export class UpdateSponsorLevelDto extends PartialType(CreateSponsorLevelDto) {}
