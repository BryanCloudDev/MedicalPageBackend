import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto'
import { fileFilter } from 'src/common/utils'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/patient')
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter
    })
  )
  registerUser(
    @Body() createPatientDto: CreatePatientDto,
    @UploadedFile() photo: Express.Multer.File
  ) {
    return this.authService.registerUser(createPatientDto, photo)
  }
}
