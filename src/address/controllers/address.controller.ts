import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query
} from '@nestjs/common'
import { AddressService } from '../service'
import { PaginationDto } from 'src/common/dtos'
import { UpdateAddressDto } from '../dto/address/update-address.dto'
import { Auth } from 'src/auth/decorators'
import { Roles } from 'src/user/enums'
import {
  ApiExtraModels,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { Description } from 'src/common/swagger/description.swagger'
import {
  AddressResponse,
  AddressResponseAll
} from 'src/common/swagger/classes/address.class'
import { GenericResponses } from 'src/common/decorators/genericResponses.decorator'

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @GenericResponses({ auth: true })
  @ApiOkResponse({
    type: AddressResponseAll
  })
  @ApiOperation({
    summary: 'Find all addresses',
    description: Description.administrator
  })
  @ApiExtraModels(PaginationDto)
  @Auth(Roles.ADMINISTRATOR)
  findAll(@Query() query: PaginationDto) {
    return this.addressService.findAll(query)
  }

  @Get(':id')
  @GenericResponses({ auth: true })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOkResponse({
    type: AddressResponse
  })
  @ApiOperation({
    summary: 'Find address by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  findById(@Param('id') id: string) {
    return this.addressService.findById(id)
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
    summary: 'Update address by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto
  ) {
    return this.addressService.updateById(id, updateAddressDto)
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
    summary: 'Delete address by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.addressService.deleteById(id)
  }
}
