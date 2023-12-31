import { Controller, Post, Body } from '@nestjs/common'
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/patient')
  registerPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.authService.registerPatient(createPatientDto)
  }

  @Post('login/patient')
  loginPatient(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginPatient(loginUserDto)
  }

  @Post('login/doctor')
  loginDoctor(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginDoctor(loginUserDto)
  }
}
