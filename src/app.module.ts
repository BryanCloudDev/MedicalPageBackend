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
import { AddressModule } from './address/address.module'
import { HospitalModule } from './hospital/hospital.module'
import { ClinicModule } from './clinic/clinic.module'
import { ReviewsModule } from './reviews/reviews.module'
import { SponsorLevelModule } from './sponsor-level/sponsor-level.module'

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
    SpecialtyModule,
    AddressModule,
    HospitalModule,
    ClinicModule,
    ReviewsModule,
    SponsorLevelModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
