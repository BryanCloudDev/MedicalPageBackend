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
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { Description } from 'src/common/swagger/description.swagger'
import { AddressResponse } from 'src/common/swagger/classes/address.class'

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    type: [AddressResponse]
  })
  @ApiBadRequestResponse({
    description: 'Bad Request'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error'
  })
  @ApiOperation({
    summary: 'Get all addresses',
    description: Description.administrator
  })
  // @Auth(Roles.ADMINISTRATOR)
  findAll(@Query() query: PaginationDto) {
    return this.addressService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    type: AddressResponse
  })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiBadRequestResponse({
    description: 'Bad Request'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error'
  })
  @ApiOperation({
    summary: 'Get address by id',
    description: Description.getPatientAndDoctor()
  })
  @Auth(Roles.PATIENT, Roles.DOCTOR)
  findById(@Param('id') id: string) {
    return this.addressService.findById(id)
  }

  @Patch(':id')
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiBadRequestResponse({
    description: 'Bad Request'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error'
  })
  @ApiOperation({
    summary: 'Update address by id',
    description: Description.getDoctorPatientAndAdministrator()
  })
  @Auth(Roles.PATIENT, Roles.DOCTOR, Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto
  ) {
    return this.addressService.updateById(id, updateAddressDto)
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiBadRequestResponse({
    description: 'Bad Request'
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error'
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
