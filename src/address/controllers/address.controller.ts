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
import { CreateAddressDto } from '../dto/address/create-address.dto'
import { AddressService } from '../service'
import { PaginationDto } from 'src/common/dtos'
import { UpdateAddressDto } from '../dto/address/update-address.dto'
import { Auth } from 'src/auth/decorators'
import { Roles } from 'src/user/enums'

@Controller()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Post()
  // @Auth(Roles.PATIENT, Roles.DOCTOR)
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto)
  }

  @Get()
  // @Auth(Roles.ADMINISTRATOR)
  findAll(@Query() query: PaginationDto) {
    return this.addressService.findAll()
  }

  @Get(':id')
  // @Auth(Roles.PATIENT, Roles.DOCTOR)
  findById(@Param('id') id: string) {
    return this.addressService.findById(id)
  }

  @Patch(':id')
  // @Auth(Roles.PATIENT, Roles.DOCTOR, Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto
  ) {
    return this.addressService.updateById(id, updateAddressDto)
  }

  @Delete(':id')
  // @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.addressService.deleteById(id)
  }
}
