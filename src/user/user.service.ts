import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { errorHandler } from 'src/common/utils'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>
  ) {}

  private readonly logger = new Logger(UserService.name)

  async findByEmail(email: string): Promise<User> {
    try {
      const patient = await this.userRepository.findOneBy({ email })
      return patient
    } catch (error) {
      errorHandler(this.logger, error)
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const patient = await this.userRepository.findOneBy({ id })
      return patient
    } catch (error) {
      errorHandler(this.logger, error)
    }
  }
}
