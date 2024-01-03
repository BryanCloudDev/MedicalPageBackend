import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>
  ) {}

  async findByEmail(email: string): Promise<User> {
    const patient = await this.userRepository.findOneBy({ email })
    return patient
  }

  async findById(id: string): Promise<User> {
    const patient = await this.userRepository.findOneBy({ id })
    return patient
  }
}
