import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query
} from '@nestjs/common'
import { ClinicService } from './clinic.service'
import { CreateClinicDto } from './dto/create-clinic.dto'
import { UpdateClinicDto } from './dto/update-clinic.dto'
import { Auth } from 'src/auth/decorators'
import { Roles } from 'src/user/enums'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { GenericResponses } from 'src/common/decorators/genericResponses.decorator'
import { Description } from 'src/common/swagger/description.swagger'
import { ClinicResponse } from 'src/common/swagger/classes/clinic.class'
import { PaginationDto } from 'src/common/dtos'

@ApiTags('Clinic')
@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  @GenericResponses({ auth: true })
  @ApiCreatedResponse({
    description: 'Created'
  })
  @ApiOperation({
    summary: 'Create a clinic',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicService.create(createClinicDto)
  }

  @Get()
  @GenericResponses()
  @ApiOkResponse({
    description: 'Success',
    type: [ClinicResponse]
  })
  @ApiOperation({
    summary: 'Find all clinics'
  })
  findAll(@Query() query: PaginationDto) {
    return this.clinicService.findAll()
  }

  @Get(':id')
  @GenericResponses()
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOkResponse({
    type: ClinicResponse
  })
  @ApiOperation({
    summary: 'Find clinic by id'
  })
  findById(@Param('id') id: string) {
    return this.clinicService.findById(id)
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
    summary: 'Update clinic by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updateClinicDto: UpdateClinicDto
  ) {
    return this.clinicService.updateById(id, updateClinicDto)
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
    summary: 'Delete clinic by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.clinicService.deleteById(id)
  }
}
