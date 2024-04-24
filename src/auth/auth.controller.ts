import { Controller, Post, Body } from '@nestjs/common'
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto'
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/patient')
  registerPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.authService.registerPatient(createPatientDto)
  }

  @Post('register/doctor')
  registerDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.authService.registerDoctor(createDoctorDto)
  }

  @Post('login')
  loginPatient(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto)
  }
}
