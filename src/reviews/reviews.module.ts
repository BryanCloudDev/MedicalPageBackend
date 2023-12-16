import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { ReviewsController } from './reviews.controller'
import { ReviewsService } from './reviews.service'
import { Review } from './entities/review.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [ReviewsController],
  providers: [ReviewsService]
})
export class ReviewsModule {}
