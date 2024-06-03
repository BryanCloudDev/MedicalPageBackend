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
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { GenericResponses } from 'src/common/decorators/genericResponses.decorator'
import { Description } from 'src/common/swagger/description.swagger'
import { SponsorLevelResponse } from 'src/common/swagger/classes/sponsor-level.class'

@ApiTags('Sponsor Level')
@Controller('sponsor-level')
export class SponsorLevelController {
  constructor(private readonly sponsorLevelService: SponsorLevelService) {}

  @Post()
  @GenericResponses({ auth: true })
  @ApiOkResponse({
    description: 'Created'
  })
  @ApiOperation({
    summary: 'Create sponsor level',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  create(@Body() createSponsorLevelDto: CreateSponsorLevelDto) {
    return this.sponsorLevelService.create(createSponsorLevelDto)
  }

  @Get()
  @GenericResponses()
  @ApiOkResponse({
    description: 'Success',
    type: [SponsorLevelResponse]
  })
  @ApiOperation({
    summary: 'Find all sponsor levels'
  })
  findAll(@Query() query: PaginationDto) {
    return this.sponsorLevelService.findAll()
  }

  @Get(':id')
  @GenericResponses()
  @ApiOkResponse({
    description: 'Success',
    type: SponsorLevelResponse
  })
  @ApiOperation({
    summary: 'Find sponsor level by id'
  })
  findById(@Param('id') id: string) {
    return this.sponsorLevelService.findById(id)
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
    summary: 'Update sponsor level by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updateSponsorLevelDto: UpdateSponsorLevelDto
  ) {
    return this.sponsorLevelService.updateById(id, updateSponsorLevelDto)
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
    summary: 'Delete sponsor level by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.sponsorLevelService.deleteById(id)
  }
}
