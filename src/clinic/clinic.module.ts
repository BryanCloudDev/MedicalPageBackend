import { Module } from '@nestjs/common'
import { ClinicDoctor } from './entities/clinicDoctor.entity'
import { ClinicController } from './clinic.controller'
import { Clinic } from './entities/clinic.entity'
import { ClinicService } from './clinic.service'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Clinic, ClinicDoctor])],
  controllers: [ClinicController],
  providers: [ClinicService]
})
export class ClinicModule {}
