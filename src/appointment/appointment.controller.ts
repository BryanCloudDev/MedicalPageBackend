import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { AppointmentService } from './appointment.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { Auth, GetUser } from 'src/auth/decorators'
import { User } from 'src/user/entities/user.entity'
import { Roles } from 'src/user/enums'

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @Auth(Roles.PATIENT)
  create(
    @GetUser() user: User,
    @Body() createAppointmentDto: CreateAppointmentDto
  ) {
    return this.appointmentService.create(createAppointmentDto, user)
  }

  @Get()
  @Auth(Roles.ADMINISTRATOR, Roles.DOCTOR, Roles.PATIENT)
  findAll() {
    return this.appointmentService.findAll()
  }

  @Get(':id')
  @Auth(Roles.ADMINISTRATOR)
  findOneById(@Param('id') id: string) {
    return this.appointmentService.findOneById(id)
  }

  @Patch(':id')
  @Auth(Roles.ADMINISTRATOR, Roles.DOCTOR, Roles.PATIENT)
  updateById(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentService.updateById(id, updateAppointmentDto)
  }

  @Delete(':id')
  @Auth(Roles.ADMINISTRATOR, Roles.DOCTOR, Roles.PATIENT)
  deleteById(@Param('id') id: string) {
    return this.appointmentService.deleteById(id)
  }
}
