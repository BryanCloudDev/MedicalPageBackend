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
import { AddressModule } from 'src/address/address.module'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthController } from './auth.controller'
import { FileModule } from 'src/file/file.module'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'
import { PatientModule } from 'src/patient/patient.module'
import { DoctorModule } from 'src/doctor/doctor.module'
import { SpecialtyModule } from 'src/specialty/specialty.module'
import { AdministratorModule } from 'src/administrator/administrator.module'
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
          expiresIn: '1h'
        }
      })
    })
  ],
  exports: [JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckEmailMiddleware).forRoutes({
      path: '/auth/register/*',
      method: RequestMethod.POST
    })
  }
}
