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
import { CreateStateDto } from '../dto/state/create-state.dto'
import { StateService } from '../service'
import { PaginationDto } from 'src/common/dtos'
import { UpdateStateDto } from '../dto/state/update-state.dto'
import { Auth } from 'src/auth/decorators'
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
import { StateResponse } from 'src/common/swagger/classes/address.class'

@ApiTags('State')
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  @GenericResponses({ auth: true })
  @ApiCreatedResponse({
    description: 'Created'
  })
  @ApiOperation({
    summary: 'Create a state',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  create(@Body() createCountryCodeDto: CreateStateDto) {
    this.stateService.create(createCountryCodeDto)
  }

  @Get()
  @GenericResponses()
  @ApiOkResponse({
    description: 'Success',
    type: [StateResponse]
  })
  @ApiOperation({
    summary: 'Find all states'
  })
  @ApiExtraModels(PaginationDto)
  findAll(@Query() query: PaginationDto) {
    return this.stateService.findAll(query)
  }

  @Get(':id')
  @GenericResponses()
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOkResponse({
    description: 'Success',
    type: StateResponse
  })
  @ApiOperation({
    summary: 'Find state by id'
  })
  findById(@Param('id') id: string) {
    return this.stateService.findById(id)
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
    summary: 'Update state by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.updateById(id, updateStateDto)
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
    summary: 'Delete state by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.stateService.deleteById(id)
  }
}
