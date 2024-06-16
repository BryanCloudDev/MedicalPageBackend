import { Module } from '@nestjs/common'
import { AddressModule } from 'src/address/address.module'
import { InitService } from './init-status.service'
import { InitStatus } from './entities/init.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SpecialtyModule } from 'src/specialty/specialty.module'
import { ClinicModule } from 'src/clinic/clinic.module'
import { HospitalModule } from 'src/hospital/hospital.module'
import { SponsorLevelModule } from 'src/sponsor-level/sponsor-level.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  providers: [InitService],
  imports: [
    TypeOrmModule.forFeature([InitStatus]),
    AddressModule,
    AuthModule,
    ClinicModule,
    HospitalModule,
    SpecialtyModule,
    SponsorLevelModule
  ]
})
export class InitModule {}
