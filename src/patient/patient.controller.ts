import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { User } from 'src/user/entities/user.entity'
import { Auth, GetUser } from 'src/auth/decorators'
import { PatientService } from './patient.service'
import { fileFilter } from 'src/common/utils'
import { Roles } from 'src/user/enums'

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Patch('upload/photo')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter: fileFilter
    })
  )
  @Auth(Roles.PATIENT)
  uploadPhoto(
    @UploadedFile()
    file: Express.Multer.File,
    @GetUser() user: User
  ) {
    return this.patientService.uploadPhoto(file, user)
  }

  // @Get('profile')
  // @Auth(Roles.PATIENT)
  getPatientProfile(@GetUser() user: User) {
    return this.patientService.getPatientProfile(user)
  }

  // @Get(':id')
  // @Auth(Roles.ADMINISTRATOR, Roles.DOCTOR)
  findOne(@Param('id') id: string) {
    return this.patientService.findById(id)
  }

  // @Patch()
  // @Auth(Roles.PATIENT)
  updateByUserToken(
    @GetUser() user: User,
    @Body() updatePatientDto: UpdatePatientDto
  ) {
    const { id } = user
    return this.patientService.updateById(id, updatePatientDto)
  }

  // @Patch(':id')
  // @Auth(Roles.ADMINISTRATOR)
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.updateById(id, updatePatientDto)
  }

  // @Delete(':id')
  // @Auth(Roles.ADMINISTRATOR)
  remove(@Param('id') id: string) {
    return this.patientService.deleteById(id)
  }
}
