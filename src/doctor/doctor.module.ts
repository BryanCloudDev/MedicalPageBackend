import { Module } from '@nestjs/common'
import { DoctorService } from './doctor.service'
import { DoctorsController } from './doctor.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Doctor } from './entities/doctor.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctorsController],
  providers: [DoctorService],
  exports: [DoctorService]
})
export class DoctorModule {}
