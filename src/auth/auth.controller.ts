import {
  Controller,
  Post,
  Body,
  Logger,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
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
import { CreateAdministratorDto } from 'src/administrator/dto/create-administrator.dto'
import { Roles } from 'src/user/enums'
import { Auth } from './decorators'
import { Description } from 'src/common/swagger/description.swagger'

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

  @Post('register/administrator')
  @GenericResponses({ auth: true })
  @ApiCreatedResponse({
    description: 'Created',
    type: JWTResponse
  })
  @ApiOperation({
    summary: 'Registrate an administrator',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  registerAdministrator(
    @Body() createAdministratorDto: CreateAdministratorDto
  ) {
    return this.authService.registerAdministrator(createAdministratorDto)
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
  @HttpCode(HttpStatus.OK)
  loginPatient(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto)
  }
}
