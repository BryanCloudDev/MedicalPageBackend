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
import { CreatePhoneCodeDto } from '../dto/phone-code/create-phone-code.dto'
import { UpdatePhoneCodeDto } from '../dto/phone-code/update-phone-code.dto'
import { PaginationDto } from 'src/common/dtos'
import { PhoneCodeService } from '../service'
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
import { PhoneCodeResponse } from 'src/common/swagger/classes/address.class'

@ApiTags('Phone Code')
@Controller('phone-code')
export class PhoneCodeController {
  constructor(private readonly phoneCodeService: PhoneCodeService) {}

  @Post()
  @GenericResponses({ auth: true })
  @ApiCreatedResponse({
    description: 'Created'
  })
  @ApiOperation({
    summary: 'Create a phone code',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  create(@Body() createPhoneCodeDto: CreatePhoneCodeDto) {
    this.phoneCodeService.create(createPhoneCodeDto)
  }

  @Get()
  @GenericResponses()
  @ApiOkResponse({
    description: 'Success',
    type: [PhoneCodeResponse]
  })
  @ApiOperation({
    summary: 'Find all phone codes'
  })
  @ApiExtraModels(PaginationDto)
  findAll(@Query() query: PaginationDto) {
    return this.phoneCodeService.findAll(query)
  }

  @Get(':id')
  @GenericResponses()
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOkResponse({
    description: 'Success',
    type: PhoneCodeResponse
  })
  @ApiOperation({
    summary: 'Find phone code by id'
  })
  findById(@Param('id') id: string) {
    return this.phoneCodeService.findById(id)
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
    summary: 'Update phone code by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updatePhoneCodeDto: UpdatePhoneCodeDto
  ) {
    return this.phoneCodeService.updateById(id, updatePhoneCodeDto)
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
    summary: 'Delete phone code by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.phoneCodeService.deleteById(id)
  }
}
