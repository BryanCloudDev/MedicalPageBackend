import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { SponsorLevelService } from './sponsor-level.service'
import { CreateSponsorLevelDto } from './dto/create-sponsor-level.dto'
import { UpdateSponsorLevelDto } from './dto/update-sponsor-level.dto'

@Controller('sponsor-level')
export class SponsorLevelController {
  constructor(private readonly sponsorLevelService: SponsorLevelService) {}

  @Post()
  create(@Body() createSponsorLevelDto: CreateSponsorLevelDto) {
    return this.sponsorLevelService.create(createSponsorLevelDto)
  }

  @Get()
  findAll() {
    return this.sponsorLevelService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sponsorLevelService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSponsorLevelDto: UpdateSponsorLevelDto
  ) {
    return this.sponsorLevelService.update(+id, updateSponsorLevelDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sponsorLevelService.remove(+id)
  }
}
