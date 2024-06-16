import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommonModule } from './common/common.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { envConfiguration } from './config/env.config'
import { DoctorModule } from './doctor/doctor.module'
import { PatientModule } from './patient/patient.module'
import { AppointmentModule } from './appointment/appointment.module'
import { SpecialtyModule } from './specialty/specialty.module'
import { AddressModule } from './address/address.module'
import { HospitalModule } from './hospital/hospital.module'
import { ClinicModule } from './clinic/clinic.module'
import { ReviewModule } from './review/review.module'
import { SponsorLevelModule } from './sponsor-level/sponsor-level.module'
import { FileModule } from './file/file.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { JoiValidationSchema } from './config/joi.validation'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { InitModule } from './init-status/init-status.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
      validationSchema: JoiValidationSchema
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOSTNAME,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true
    }),
    ThrottlerModule.forRoot([
      {
        // TTL is 15 minutes
        ttl: 900000,
        // Limit requests up to 100 per minute per IP
        limit: 100
      }
    ]),
    AddressModule,
    AppointmentModule,
    AuthModule,
    ClinicModule,
    CommonModule,
    DoctorModule,
    FileModule,
    HospitalModule,
    InitModule,
    PatientModule,
    ReviewModule,
    SpecialtyModule,
    SponsorLevelModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
