import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { SpecialtyModule } from 'src/specialty/specialty.module'
import { DoctorsController } from './doctor.controller'
import { DoctorRepository } from './doctor.repository'
import { Doctor } from './entities/doctor.entity'
import { UserModule } from 'src/user/user.module'
import { FileModule } from 'src/file/file.module'
import { DoctorService } from './doctor.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor]),
    UserModule,
    FileModule,
    SpecialtyModule
  ],
  controllers: [DoctorsController],
  providers: [DoctorService, DoctorRepository],
  exports: [DoctorService]
})
export class DoctorModule {}
