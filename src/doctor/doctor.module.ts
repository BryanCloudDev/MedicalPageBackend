import { Module } from '@nestjs/common'
import { DoctorService } from './doctor.service'
import { DoctorsController } from './doctor.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Doctor } from './entities/doctor.entity'
import { UserModule } from 'src/user/user.module'
import { FileModule } from 'src/file/file.module'

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]), UserModule, FileModule],
  controllers: [DoctorsController],
  providers: [DoctorService],
  exports: [DoctorService]
})
export class DoctorModule {}
