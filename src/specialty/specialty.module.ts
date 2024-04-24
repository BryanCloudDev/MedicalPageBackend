import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { SpecialtyController } from './specialty.controller'
import { SpecialtyService } from './specialty.service'
import { Specialty } from './entities/specialty.entity'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [TypeOrmModule.forFeature([Specialty]), ConfigModule],
  controllers: [SpecialtyController],
  providers: [SpecialtyService]
})
export class SpecialtyModule {}
