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

@Controller('phone-code')
export class PhoneCodeController {
  constructor(private readonly phoneCodeService: PhoneCodeService) {}

  @Post()
  @Auth(Roles.ADMINISTRATOR)
  create(@Body() createPhoneCodeDto: CreatePhoneCodeDto) {
    return this.phoneCodeService.create(createPhoneCodeDto)
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.phoneCodeService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.phoneCodeService.findById(id)
  }

  @Patch(':id')
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updatePhoneCodeDto: UpdatePhoneCodeDto
  ) {
    return this.phoneCodeService.updateById(id, updatePhoneCodeDto)
  }

  @Delete(':id')
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.phoneCodeService.deleteById(id)
  }
}
