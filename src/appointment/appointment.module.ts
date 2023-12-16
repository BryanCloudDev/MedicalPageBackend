import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppointmentController } from './appointment.controller'
import { AppointmentService } from './appointment.service'
import { Appointment } from './entities/appointment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
