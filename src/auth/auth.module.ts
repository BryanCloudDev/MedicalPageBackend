import { ConfigModule, ConfigService } from '@nestjs/config'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { CheckEmailMiddleware } from './middlewares/check-email/check-email.middleware'
import { Patient } from 'src/patient/entities/patient.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { AddressModule } from 'src/address/address.module'
import { PatientModule } from 'src/patient/patient.module'
import { DoctorsModule } from 'src/doctors/doctors.module'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthController } from './auth.controller'
import { FileModule } from 'src/file/file.module'
import { AuthService } from './auth.service'
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Patient]),
    TypeOrmModule.forFeature([Doctor]),
    FileModule,
    AddressModule,
    PatientModule,
    DoctorsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h'
        }
      })
    })
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckEmailMiddleware).forRoutes({
      path: '/auth/register/*',
      method: RequestMethod.POST
    })
  }
}
