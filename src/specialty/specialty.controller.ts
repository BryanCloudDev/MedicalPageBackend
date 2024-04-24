import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common'
import { SpecialtyService } from './specialty.service'
import { CreateSpecialtyDto } from './dto/create-specialty.dto'
import { UpdateSpecialtyDto } from './dto/update-specialty.dto'
import { Auth } from 'src/auth/decorators'
import { Roles } from 'src/user/enums'
import { PaginationDto } from 'src/common/dtos'

@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Post()
  @Auth(Roles.ADMINISTRATOR)
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtyService.create(createSpecialtyDto)
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.specialtyService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.specialtyService.findById(id)
  }

  @Patch(':id')
  @Auth(Roles.ADMINISTRATOR)
  updateById(
    @Param('id') id: string,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto
  ) {
    return this.specialtyService.updateById(id, updateSpecialtyDto)
  }

  @Delete(':id')
  @Auth(Roles.ADMINISTRATOR)
  deleteById(@Param('id') id: string) {
    return this.specialtyService.deleteById(id)
  }
}
