import { Module } from '@nestjs/common'
import { ClinicDoctor } from './entities/clinicDoctor.entity'
import { ClinicController } from './clinic.controller'
import { Clinic } from './entities/clinic.entity'
import { ClinicService } from './clinic.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { AddressModule } from 'src/address/address.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Clinic, ClinicDoctor]),
    ConfigModule,
    AddressModule
  ],
  controllers: [ClinicController],
  providers: [ClinicService]
})
export class ClinicModule {}
