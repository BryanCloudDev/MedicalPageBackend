import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import { SponsorLevelService } from './sponsor-level.service'
import { CreateSponsorLevelDto } from './dto/create-sponsor-level.dto'
import { UpdateSponsorLevelDto } from './dto/update-sponsor-level.dto'
import { PaginationDto } from 'src/common/dtos'
import { Auth } from 'src/auth/decorators'
import { Roles } from 'src/user/enums'

@Controller('sponsor-level')
export class SponsorLevelController {
  constructor(private readonly sponsorLevelService: SponsorLevelService) {}

  @Post()
  // @Auth(Roles.ADMINISTRATOR)
  create(@Body() createSponsorLevelDto: CreateSponsorLevelDto) {
    return this.sponsorLevelService.create(createSponsorLevelDto)
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.sponsorLevelService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.sponsorLevelService.findOne(id)
  }

  @Patch(':id')
  // @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updateSponsorLevelDto: UpdateSponsorLevelDto
  ) {
    return this.sponsorLevelService.update(id, updateSponsorLevelDto)
  }

  @Delete(':id')
  // @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.sponsorLevelService.remove(id)
  }
}
