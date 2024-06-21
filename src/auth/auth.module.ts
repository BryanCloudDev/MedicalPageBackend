import { ConfigModule, ConfigService } from '@nestjs/config'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { CheckEmailMiddleware } from './middlewares/check-email/check-email.middleware'
import { AdministratorModule } from 'src/administrator/administrator.module'
import { SpecialtyModule } from 'src/specialty/specialty.module'
import { AddressModule } from 'src/address/address.module'
import { PatientModule } from 'src/patient/patient.module'
import { JwtStrategy } from './strategies/jwt.strategy'
import { DoctorModule } from 'src/doctor/doctor.module'
import { AuthController } from './auth.controller'
import { FileModule } from 'src/file/file.module'
import { UserModule } from 'src/user/user.module'
import { AuthService } from './auth.service'
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    AddressModule,
    AdministratorModule,
    ConfigModule,
    DoctorModule,
    FileModule,
    PatientModule,
    SpecialtyModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION_TIME')
        }
      })
    })
  ],
  exports: [JwtStrategy, PassportModule, JwtModule, AuthService]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckEmailMiddleware).forRoutes({
      // This will apply the middleware to all routes that start with /auth/register
      // to check if the email already exists in the app
      path: '/auth/register/*',
      method: RequestMethod.POST
    })
  }
}
