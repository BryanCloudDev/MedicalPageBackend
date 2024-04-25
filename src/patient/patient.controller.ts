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
  HttpStatus,
  Query
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { User } from 'src/user/entities/user.entity'
import { Auth, GetUser } from 'src/auth/decorators'
import { PatientService } from './patient.service'
import { fileFilter } from 'src/common/utils'
import { Roles } from 'src/user/enums'
import { PaginationDto } from 'src/common/dtos'

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Patch('upload/photo')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter
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

  @Get('profile')
  @Auth(Roles.PATIENT)
  getPatientProfile(@GetUser() user: User) {
    return this.patientService.getPatientProfile(user)
  }

  @Get(':id')
  @Auth(Roles.ADMINISTRATOR, Roles.DOCTOR)
  findOne(@Param('id') id: string) {
    return this.patientService.findById(id)
  }

  @Get()
  findAll(@Query() filterDto: PaginationDto) {
    return this.patientService.findAll(filterDto)
  }

  @Patch()
  @Auth(Roles.PATIENT)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateByUserToken(
    @GetUser() user: User,
    @Body() updatePatientDto: UpdatePatientDto
  ) {
    const { id } = user
    return this.patientService.updateById(id, updatePatientDto)
  }

  @Patch(':id')
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.updateById(id, updatePatientDto)
  }

  @Delete(':id')
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.patientService.deleteById(id)
  }
}
