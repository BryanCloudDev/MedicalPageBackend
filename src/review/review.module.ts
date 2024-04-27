import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'
import { Review } from './entities/review.entity'
import { DoctorModule } from 'src/doctor/doctor.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [TypeOrmModule.forFeature([Review]), DoctorModule, ConfigModule],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
