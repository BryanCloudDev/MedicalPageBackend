import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CheckEmailMiddleware } from './middlewares/check-email/check-email.middleware'
import { Patient } from 'src/patient/entities/patient.entity'
import { AddressModule } from 'src/address/address.module'
import { PatientModule } from 'src/patient/patient.module'
import { DoctorsModule } from 'src/doctors/doctors.module'
import { AuthController } from './auth.controller'
import { FileModule } from 'src/file/file.module'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([Patient]),
    FileModule,
    AddressModule,
    PatientModule,
    DoctorsModule
  ]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckEmailMiddleware).forRoutes({
      path: '/auth/register/*',
      method: RequestMethod.POST
    })
  }
}
