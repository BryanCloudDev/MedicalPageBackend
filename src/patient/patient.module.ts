import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { PatientController } from './patient.controller'
import { Patient } from './entities/patient.entity'
import { PatientService } from './patient.service'
import { FileModule } from 'src/file/file.module'

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), FileModule],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService]
})
export class PatientModule {}
