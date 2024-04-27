import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { User } from 'src/user/entities/user.entity'
import { Review } from './entities/review.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DoctorService } from 'src/doctor/doctor.service'
import { currentDate, exceptionHandler } from 'src/common/utils'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly doctorService: DoctorService,
    private readonly configService: ConfigService
  ) {}
  private readonly logger = new Logger(ReviewService.name)
  private readonly take = this.configService.get('ENTITIES_LIMIT')
  private readonly skip = this.configService.get('ENTITIES_SKIP')

  async create(createReviewDto: CreateReviewDto, patient: User) {
    try {
      const { doctorId, ...reviewPartial } = createReviewDto

      const doctor = await this.doctorService.findById(doctorId)

      const reviewInstance = this.reviewRepository.create({
        ...reviewPartial,
        patient: patient.patient,
        doctor: doctor.doctor
      })

      await this.reviewRepository.save(reviewInstance)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(skip = this.skip, take = this.take, deleted = false) {
    try {
      const reviews = await this.reviewRepository.find({
        skip,
        take
      })

      return deleted ? reviews : this.trasformResponse(reviews)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string) {
    try {
      const review = await this.reviewRepository.findOneBy({ id })

      this.checkIfReviewExists(id, review)

      if (review.deletedOn) {
        throw new BadRequestException(`The review with id ${id} was deleted`)
      }

      return review
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(id: string, updateReviewDto: UpdateReviewDto) {
    try {
      await this.findById(id)

      await this.reviewRepository.update(id, updateReviewDto)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string) {
    try {
      const specialty = await this.findById(id)

      if (specialty.deletedOn) {
        throw new BadRequestException(`Review is already inactive`)
      }

      await this.reviewRepository.update(id, {
        deletedOn: currentDate()
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private checkIfReviewExists(id: string, specialty: Review | undefined) {
    if (!specialty) {
      throw new NotFoundException(`The review with id ${id} was not found`)
    }
  }

  private trasformResponse(reviews: Review[]) {
    return reviews
      .filter((review) => review.deletedOn === null)
      .map((review) => {
        delete review.deletedOn

        return review
      })
  }
}
