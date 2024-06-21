import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { PatientController } from './patient.controller'
import { Patient } from './entities/patient.entity'
import { PatientService } from './patient.service'
import { FileModule } from 'src/file/file.module'
import { UserModule } from 'src/user/user.module'
import { PatientRepository } from './patient.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), FileModule, UserModule],
  controllers: [PatientController],
  providers: [PatientService, PatientRepository],
  exports: [PatientService]
})
export class PatientModule {}
