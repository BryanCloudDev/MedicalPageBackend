import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { CreateCityDto } from '../dto/city/create-city.dto'
import { UpdateCityDto } from '../dto/city/update-city.dto'
import { PaginationDto } from 'src/common/dtos'
import { Auth } from 'src/auth/decorators'
import { CityService } from '../service'
import { Roles } from 'src/user/enums'

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  @Post()
  @Auth(Roles.ADMINISTRATOR)
  create(@Body() createCountryCodeDto: CreateCityDto) {
    return this.cityService.create(createCountryCodeDto)
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.cityService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.cityService.findById(id)
  }

  @Patch(':id')
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.updateById(id, updateCityDto)
  }

  @Delete(':id')
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.cityService.deleteById(id)
  }
}
