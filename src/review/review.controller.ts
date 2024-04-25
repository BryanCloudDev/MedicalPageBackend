import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { User } from 'src/user/entities/user.entity'
import { Auth, GetUser } from 'src/auth/decorators'
import { ReviewService } from './review.service'
import { Roles } from 'src/user/enums'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Auth(Roles.PATIENT)
  create(@Body() createReviewDto: CreateReviewDto, @GetUser() user: User) {
    return this.reviewService.create(createReviewDto, user)
  }

  @Get()
  findAll() {
    return this.reviewService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.reviewService.findById(id)
  }

  @Patch(':id')
  @Auth(Roles.PATIENT, Roles.ADMINISTRATOR)
  updateById(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    return this.reviewService.updateById(id, updateReviewDto)
  }

  @Delete(':id')
  @Auth(Roles.PATIENT, Roles.ADMINISTRATOR)
  deleteById(@Param('id') id: string) {
    return this.reviewService.deleteById(id)
  }
}
