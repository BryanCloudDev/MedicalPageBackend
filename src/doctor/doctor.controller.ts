import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  Query
} from '@nestjs/common'
import { UpdateDoctorDto } from './dto/update-doctor.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { User } from 'src/user/entities/user.entity'
import { Auth, GetUser } from 'src/auth/decorators'
import { DoctorService } from './doctor.service'
import { PaginationDto } from 'src/common/dtos'
import { fileFilter } from 'src/common/utils'
import { Roles } from 'src/user/enums'

@Controller('doctor')
export class DoctorsController {
  constructor(private readonly doctorService: DoctorService) {}

  @Patch('upload/photo')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter
    })
  )
  @Auth(Roles.DOCTOR)
  uploadPhoto(
    @UploadedFile()
    file: Express.Multer.File,
    @GetUser() user: User
  ) {
    return this.doctorService.uploadPhoto(file, user)
  }

  @Get('profile')
  @Auth(Roles.DOCTOR)
  getDoctorProfile(@GetUser() user: User) {
    return this.doctorService.getDoctorProfile(user)
  }

  @Get()
  findAll(@Query() filterDto: PaginationDto) {
    return this.doctorService.findAll(filterDto)
  }

  @Get(':id')
  @Auth()
  findById(@Param('id') id: string) {
    return this.doctorService.findById(id)
  }

  @Patch()
  @Auth(Roles.DOCTOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateByUserToken(
    @GetUser() user: User,
    @Body() updateDoctorDto: UpdateDoctorDto
  ) {
    const { id } = user
    return this.doctorService.updateById(id, updateDoctorDto)
  }

  @Patch(':id')
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto
  ) {
    return this.doctorService.updateById(id, updateDoctorDto)
  }

  @Delete(':id')
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.doctorService.deleteById(id)
  }
}