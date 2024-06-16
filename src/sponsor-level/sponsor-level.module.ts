import { Module } from '@nestjs/common'
import { SponsorLevelService } from './sponsor-level.service'
import { SponsorLevelController } from './sponsor-level.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SponsorLevel } from './entities/sponsor-level.entity'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [TypeOrmModule.forFeature([SponsorLevel]), ConfigModule],
  controllers: [SponsorLevelController],
  providers: [SponsorLevelService],
  exports: [SponsorLevelService]
})
export class SponsorLevelModule {}
