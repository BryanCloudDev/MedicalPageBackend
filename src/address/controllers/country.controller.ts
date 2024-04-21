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
import { CreateCountryDto } from '../dto/country/create-country.dto'
import { CountryService } from '../service'
import { UpdateCountryDto } from '../dto/country/update-country.dto'
import { Auth } from 'src/auth/decorators'
import { PaginationDto } from 'src/common/dtos'
import { Roles } from 'src/user/enums'

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}
  @Post()
  @Auth(Roles.ADMINISTRATOR)
  create(@Body() createCountryCodeDto: CreateCountryDto) {
    return this.countryService.create(createCountryCodeDto)
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.countryService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.countryService.findById(id)
  }

  @Patch(':id')
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updatePhoneCodeDto: UpdateCountryDto
  ) {
    return this.countryService.updateById(id, updatePhoneCodeDto)
  }

  @Delete(':id')
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.countryService.deleteById(id)
  }
}
