import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UpdateUserDto } from './dto/update-user.dto'
import { currentDate, exceptionHandler } from 'src/common/utils'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { Roles } from './enums'
import { ConfigService } from '@nestjs/config'
import { AddressService } from 'src/address/service'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly addressService: AddressService,
    private readonly configService: ConfigService
  ) {}

  private readonly logger = new Logger(UserService.name)
  private readonly take = this.configService.get('ENTITIES_LIMIT')
  private readonly skip = this.configService.get('ENTITIES_SKIP')

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
        where: { id }
      })

      return patient
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string) {
    try {
      await this.userRepository.update(id, {
        isActive: false,
        deletedOn: currentDate()
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    const { mobilePhone, address, ...partialUser } = updateUserDto

    //update user
    const user = await this.findById(id)

    this.checkIfUserExists(id, user)

    await this.userRepository.save({
      ...user,
      ...partialUser,
      mobilePhone: mobilePhone.number
    })

    // update address

    await this.addressService.updateById(user.address.id, address)

    try {
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

  async findAll(role: Roles, skip = this.skip, take = this.take) {
    try {
      const users = await this.userRepository.find({
        where: { role },
        skip,
        take,
        relations: { doctor: true, patient: true }
      })

      return users
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private checkIfUserExists(id: string, user: User | undefined) {
    if (!user) {
      throw new NotFoundException(`The user with ${id} was not found`)
    }
  }
}
