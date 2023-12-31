import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { PatientService } from './patient.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { fileFilter } from 'src/common/utils'

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('upload/photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter
    })
  )
  uploadPhoto(@UploadedFile() photo: Express.Multer.File) {
    return this.patientService.uploadPhoto(photo)
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
