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
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { GenericResponses } from 'src/common/decorators/genericResponses.decorator'
import { Description } from 'src/common/swagger/description.swagger'
import {
  CountryResponse,
  CountryResponseAll
} from 'src/common/swagger/classes/address.class'

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @GenericResponses({ auth: true })
  @ApiCreatedResponse({
    description: 'Created'
  })
  @ApiOperation({
    summary: 'Create a country',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  create(@Body() createCountryCodeDto: CreateCountryDto) {
    this.countryService.create(createCountryCodeDto)
  }

  @Get()
  @GenericResponses()
  @ApiOkResponse({
    description: 'Success',
    type: CountryResponseAll
  })
  @ApiOperation({
    summary: 'Find all countries'
  })
  @ApiExtraModels(PaginationDto)
  findAll(@Query() query: PaginationDto) {
    return this.countryService.findAll(query)
  }

  @Get(':id')
  @GenericResponses()
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOkResponse({
    description: 'Success',
    type: CountryResponse
  })
  @ApiOperation({
    summary: 'Find country by id'
  })
  findById(@Param('id') id: string) {
    return this.countryService.findById(id)
  }

  @Patch(':id')
  @GenericResponses({ auth: true })
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOperation({
    summary: 'Update country by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updatePhoneCodeDto: UpdateCountryDto
  ) {
    return this.countryService.updateById(id, updatePhoneCodeDto)
  }

  @Delete(':id')
  @GenericResponses({ auth: true })
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOperation({
    summary: 'Delete country by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.countryService.deleteById(id)
  }
}
