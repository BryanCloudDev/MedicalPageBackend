import { Module } from '@nestjs/common'
import { SponsorLevelService } from './sponsor-level.service'
import { SponsorLevelController } from './sponsor-level.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SponsorLevel } from './entities/sponsor-level.entity'

@Module({
  imports: [TypeOrmModule.forFeature([SponsorLevel])],
  controllers: [SponsorLevelController],
  providers: [SponsorLevelService]
})
export class SponsorLevelModule {}
