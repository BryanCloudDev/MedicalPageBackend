import { Controller, Get, Body, Patch, Param, Delete, HttpCode, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common'
import { DoctorService } from './doctor.service'
import { UpdateDoctorDto } from './dto/update-doctor.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth, GetUser } from 'src/auth/decorators'
import { fileFilter } from 'src/common/utils'
import { User } from 'src/user/entities/user.entity'
import { Roles } from 'src/user/enums'

@Controller('doctor')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorService) {}

  @Patch('upload/photo')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter: fileFilter
    })
  )
  @Auth(Roles.DOCTOR)
  uploadPhoto(
    @UploadedFile()
    file: Express.Multer.File,
    @GetUser() user: User
  ) {
    return this.doctorsService.uploadPhoto(file, user)
  }

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
