import { Controller, Post, Body } from '@nestjs/common'
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/patient')
  registerUser(@Body() createPatientDto: CreatePatientDto) {
    return this.authService.registerUser(createPatientDto)
  }
}
