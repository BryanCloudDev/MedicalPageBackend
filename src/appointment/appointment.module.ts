import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppointmentController } from './appointment.controller'
import { AppointmentService } from './appointment.service'
import { Appointment } from './entities/appointment.entity'
import { ConfigModule } from '@nestjs/config'
import { DoctorModule } from 'src/doctor/doctor.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    ConfigModule,
    DoctorModule
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
