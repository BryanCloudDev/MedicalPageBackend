import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UpdateUserDto } from './dto/update-user.dto'
import { exceptionHandler } from 'src/common/utils'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

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
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const patient = await this.userRepository.findOne({
        where: { id },
        relations: { doctor: true, patient: true, phoneCode: true }
      })
      return patient
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string) {
    try {
      await this.userRepository.softDelete({ id })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    const { mobilePhone, ...rest } = updateUserDto
    try {
      await this.userRepository.update(id, { ...rest })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: { doctor: true, patient: true }
      })

      return user
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
