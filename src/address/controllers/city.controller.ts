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
  CityResponse,
  CityResponseAll
} from 'src/common/swagger/classes/address.class'

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @GenericResponses({ auth: true })
  @ApiCreatedResponse({
    description: 'Created'
  })
  @ApiOperation({
    summary: 'Create a city',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  create(@Body() createCityDto: CreateCityDto) {
    this.cityService.create(createCityDto)
  }

  @Get('state/:stateId')
  @GenericResponses()
  @ApiOkResponse({
    description: 'Success',
    type: CityResponseAll
  })
  @ApiOperation({
    summary: 'Find all cities by state id'
  })
  @ApiExtraModels(PaginationDto)
  findAllByStateId(
    @Param('stateId') stateId: string,
    @Query() query: PaginationDto
  ) {
    return this.cityService.findAllByStateId(stateId, query)
  }

  @Get(':id')
  @GenericResponses()
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOkResponse({
    description: 'Success',
    type: CityResponse
  })
  @ApiOperation({
    summary: 'Find city by id'
  })
  findById(@Param('id') id: string) {
    return this.cityService.findById(id)
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
    summary: 'Update city by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.updateById(id, updateCityDto)
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
    summary: 'Delete city by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.cityService.deleteById(id)
  }
}
