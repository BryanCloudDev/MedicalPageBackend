import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common'
import { SpecialtyService } from './specialty.service'
import { CreateSpecialtyDto } from './dto/create-specialty.dto'
import { UpdateSpecialtyDto } from './dto/update-specialty.dto'
import { Auth } from 'src/auth/decorators'
import { Roles } from 'src/user/enums'
import { PaginationDto } from 'src/common/dtos'
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
import { SpecialtyResponse } from 'src/common/swagger/classes/specialty.class'

@ApiTags('Specialty')
@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Post()
  @GenericResponses({ auth: true })
  @ApiCreatedResponse({
    description: 'Created'
  })
  @ApiOperation({
    summary: 'Create a specialty',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtyService.create(createSpecialtyDto)
  }

  @Get()
  @GenericResponses()
  @ApiOkResponse({
    description: 'Success',
    type: [SpecialtyResponse]
  })
  @ApiOperation({
    summary: 'Find all specialties'
  })
  @ApiExtraModels(PaginationDto)
  findAll(@Query() query: PaginationDto) {
    return this.specialtyService.findAll(query)
  }

  @Get(':id')
  @GenericResponses()
  @ApiOkResponse({
    description: 'Success',
    type: SpecialtyResponse
  })
  @ApiOperation({
    summary: 'Find specialty by id'
  })
  findById(@Param('id') id: string) {
    return this.specialtyService.findById(id)
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
    summary: 'Update specialty by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  updateById(
    @Param('id') id: string,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto
  ) {
    return this.specialtyService.updateById(id, updateSpecialtyDto)
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
    summary: 'Delete specialty by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  deleteById(@Param('id') id: string) {
    return this.specialtyService.deleteById(id)
  }
}
