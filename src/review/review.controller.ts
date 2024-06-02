import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { User } from 'src/user/entities/user.entity'
import { Auth, GetUser } from 'src/auth/decorators'
import { ReviewService } from './review.service'
import { Roles } from 'src/user/enums'
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { GenericResponses } from 'src/common/decorators/genericResponses.decorator'
import { Description } from 'src/common/swagger/description.swagger'
import { PaginationDto } from 'src/common/dtos'
import { ReviewResponse } from 'src/common/swagger/classes/review.class'

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @GenericResponses({ auth: true })
  @ApiCreatedResponse({
    description: 'Created'
  })
  @ApiOperation({
    summary: 'Create a review',
    description: Description.patient
  })
  @Auth(Roles.PATIENT)
  create(@Body() createReviewDto: CreateReviewDto, @GetUser() user: User) {
    return this.reviewService.create(createReviewDto, user)
  }

  @Get()
  @GenericResponses()
  @ApiOkResponse({
    description: 'Success',
    type: [ReviewResponse]
  })
  @ApiOperation({
    summary: 'Find all reviews'
  })
  @ApiExtraModels(PaginationDto)
  findAll() {
    return this.reviewService.findAll()
  }

  @Get(':id')
  @GenericResponses()
  @ApiOkResponse({
    description: 'Success',
    type: ReviewResponse
  })
  @ApiOperation({
    summary: 'Find review by id'
  })
  findById(@Param('id') id: string) {
    return this.reviewService.findById(id)
  }

  @Patch(':id')
  @GenericResponses({ auth: true })
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOperation({
    summary: 'Update review by id',
    description: Description.getAdministratorAndPatient()
  })
  @Auth(Roles.PATIENT, Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    return this.reviewService.updateById(id, updateReviewDto)
  }

  @Delete(':id')
  @GenericResponses({ auth: true })
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOperation({
    summary: 'Delete review by id',
    description: Description.getAdministratorAndPatient()
  })
  @Auth(Roles.PATIENT, Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.reviewService.deleteById(id)
  }
}
