import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { AddressModule } from 'src/address/address.module'
import { PatientController } from './patient.controller'
import { Patient } from './entities/patient.entity'
import { PatientService } from './patient.service'
import { FileModule } from 'src/file/file.module'

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), FileModule, AddressModule],
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule {}
