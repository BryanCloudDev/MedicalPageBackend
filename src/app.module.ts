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
import { SeedModule } from './seed/seed.module'
import { JoiValidationSchema } from './config/joi.validation'

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
    AddressModule,
    AppointmentModule,
    AuthModule,
    ClinicModule,
    CommonModule,
    DoctorModule,
    FileModule,
    HospitalModule,
    PatientModule,
    ReviewModule,
    SpecialtyModule,
    SponsorLevelModule,
    UserModule,
    SeedModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
