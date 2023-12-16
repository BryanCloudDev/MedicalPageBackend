import { Module } from '@nestjs/common'
import { HospitalService } from './hospital.service'
import { HospitalController } from './hospital.controller'
import { HospitalDoctors } from './entities/hospitalDoctor.entity'
import { Hospital } from './entities/hospital.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Hospital, HospitalDoctors])],
  controllers: [HospitalController],
  providers: [HospitalService]
})
export class HospitalModule {}
