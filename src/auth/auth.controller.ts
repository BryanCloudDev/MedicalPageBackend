import { Controller, Post, Body, Logger } from '@nestjs/common'
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto'
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { GenericResponses } from 'src/common/decorators/genericResponses.decorator'
import { JWTResponse } from 'src/common/swagger/classes/jwt.class'

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private logger = new Logger(AuthController.name)

  @Post('register/patient')
  @GenericResponses()
  @ApiCreatedResponse({
    description: 'Created',
    type: JWTResponse
  })
  @ApiOperation({
    summary: 'Registrate a patient'
  })
  registerPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.authService.registerPatient(createPatientDto)
  }

  @Post('register/doctor')
  @GenericResponses()
  @ApiCreatedResponse({
    description: 'Created',
    type: JWTResponse
  })
  @ApiOperation({
    summary: 'Registrate a doctor'
  })
  registerDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.authService.registerDoctor(createDoctorDto)
  }

  @Post('login')
  @GenericResponses()
  @ApiOkResponse({
    description: 'Success',
    type: JWTResponse
  })
  @ApiOperation({
    summary: 'Authenticate a user'
  })
  loginPatient(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto)
  }
}
