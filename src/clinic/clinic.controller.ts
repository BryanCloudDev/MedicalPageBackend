import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import { ClinicService } from './clinic.service'
import { CreateClinicDto } from './dto/create-clinic.dto'
import { UpdateClinicDto } from './dto/update-clinic.dto'
import { Auth } from 'src/auth/decorators'
import { Roles } from 'src/user/enums'

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  @Auth(Roles.ADMINISTRATOR)
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicService.create(createClinicDto)
  }

  @Get()
  findAll() {
    return this.clinicService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.clinicService.findById(id)
  }

  @Patch(':id')
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updateClinicDto: UpdateClinicDto
  ) {
    return this.clinicService.updateById(id, updateClinicDto)
  }

  @Delete(':id')
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.clinicService.deleteById(id)
  }
}
