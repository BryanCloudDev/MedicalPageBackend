import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { HospitalService } from './hospital.service'
import { CreateHospitalDto } from './dto/create-hospital.dto'
import { UpdateHospitalDto } from './dto/update-hospital.dto'
import { Auth } from 'src/auth/decorators'
import { Roles } from 'src/user/enums'

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post()
  @Auth(Roles.ADMINISTRATOR)
  create(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalService.create(createHospitalDto)
  }

  @Get()
  findAll() {
    return this.hospitalService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.hospitalService.findById(id)
  }

  @Patch(':id')
  @Auth(Roles.ADMINISTRATOR)
  updateById(
    @Param('id') id: string,
    @Body() updateHospitalDto: UpdateHospitalDto
  ) {
    return this.hospitalService.updateById(id, updateHospitalDto)
  }

  @Delete(':id')
  @Auth(Roles.ADMINISTRATOR)
  deleteById(@Param('id') id: string) {
    return this.hospitalService.deleteById(id)
  }
}
