import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { SpecialtyController } from './specialty.controller'
import { SpecialtyService } from './specialty.service'
import { Specialty } from './entities/specialty.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Specialty])],
  controllers: [SpecialtyController],
  providers: [SpecialtyService]
})
export class SpecialtyModule {}
