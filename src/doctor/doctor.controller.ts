import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common'
import { DoctorService } from './doctor.service'
import { UpdateDoctorDto } from './dto/update-doctor.dto'

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorService) {}

  @Get()
  findAll() {
    return this.doctorsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id)
  }
}
