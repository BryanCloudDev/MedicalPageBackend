import { Module } from '@nestjs/common'
import { HospitalService } from './hospital.service'
import { HospitalController } from './hospital.controller'
import { HospitalDoctors } from './entities/hospitalDoctor.entity'
import { Hospital } from './entities/hospital.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { AddressModule } from 'src/address/address.module'
import { SpecialtyModule } from 'src/specialty/specialty.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Hospital, HospitalDoctors]),
    ConfigModule,
    AddressModule,
    SpecialtyModule
  ],
  controllers: [HospitalController],
  providers: [HospitalService],
  exports: [HospitalService]
})
export class HospitalModule {}
