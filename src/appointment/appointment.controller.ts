import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query
} from '@nestjs/common'
import { AppointmentService } from './appointment.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { Auth, GetUser } from 'src/auth/decorators'
import { User } from 'src/user/entities/user.entity'
import { Roles } from 'src/user/enums'
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiNoContentResponse
} from '@nestjs/swagger'
import { Description } from 'src/common/swagger/description.swagger'
import { GenericResponses } from 'src/common/decorators/genericResponses.decorator'
import { PaginationDto } from 'src/common/dtos'
import { AppointmentResponse } from 'src/common/swagger/classes/appointment.class'
@ApiTags('Appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @GenericResponses({ auth: true })
  @ApiCreatedResponse({
    description: 'Created'
  })
  @ApiOperation({
    summary: 'Create an appointment',
    description: Description.patient
  })
  @Auth(Roles.PATIENT)
  create(
    @GetUser() user: User,
    @Body() createAppointmentDto: CreateAppointmentDto
  ) {
    return this.appointmentService.create(createAppointmentDto, user)
  }

  @Get()
  @GenericResponses({ auth: true })
  @ApiOkResponse({
    description: 'Success',
    type: [AppointmentResponse]
  })
  @ApiOperation({
    summary: 'Find all appointments',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  findAll(@Query() query: PaginationDto) {
    return this.appointmentService.findAll()
  }

  @Get(':id')
  @GenericResponses({ auth: true })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOkResponse({
    type: AppointmentResponse
  })
  @ApiOperation({
    summary: 'Find appointment by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  findOneById(@Param('id') id: string) {
    return this.appointmentService.findById(id)
  }

  @Patch(':id')
  @GenericResponses({ auth: true })
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOperation({
    summary: 'Update appointment by id',
    description: Description.getDoctorPatientAndAdministrator()
  })
  @Auth(Roles.ADMINISTRATOR, Roles.DOCTOR, Roles.PATIENT)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentService.updateById(id, updateAppointmentDto)
  }

  @Delete(':id')
  @GenericResponses({ auth: true })
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOperation({
    summary: 'Delete appointment by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.appointmentService.deleteById(id)
  }
}
