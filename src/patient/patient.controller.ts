import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { PatientService } from './patient.service'

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll() {
    return this.patientService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id)
  }
}
