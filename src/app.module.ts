import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommonModule } from './common/common.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { envConfiguration } from './config/env.config'
import { DoctorsModule } from './doctors/doctors.module'
import { PatientModule } from './patient/patient.module'
import { AppointmentModule } from './appointment/appointment.module'
import { SpecialtyModule } from './specialty/specialty.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration]
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true
    }),
    CommonModule,
    DoctorsModule,
    PatientModule,
    AppointmentModule,
    SpecialtyModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
