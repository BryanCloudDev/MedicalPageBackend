import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'
import { currentDate, exceptionHandler } from 'src/common/utils'
import { UpdateUserDto } from './dto/update-user.dto'
import { AddressService } from 'src/address/service'
import { User } from './entities/user.entity'
import { Roles } from './enums'
import { PhoneCode } from 'src/address/entities/phone-code.entity'
import { Address } from 'src/address/entities/address.entity'

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

  async create(
    userPartial: Partial<User>,
    regionNumber: PhoneCode,
    address: Address,
    role: Roles
  ) {
    const userInstance = this.userRepository.create({
      ...userPartial,
      role,
      regionNumber,
      address
    })

    const user = await this.userRepository.save(userInstance)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const patient = await this.userRepository.findOneBy({ email })
      return patient
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    try {
      const patient = await this.userRepository.findOne({
        where: { email },
        select: { password: true, id: true, isActive: true }
      })

      return patient
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id })

      if (!user) {
        throw new NotFoundException(`User with id ${id} was not found`)
      }

      return user
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string) {
    try {
      const user = await this.findById(id)

      if (!user.isActive) {
        throw new BadRequestException(`User is already inactive`)
      }

      await this.userRepository.update(id, {
        isActive: false,
        deletedOn: currentDate()
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    try {
      //update user
      const user = await this.findById(id)

      this.checkIfUserExists(id, user)

      await this.userRepository.update(id, updateUserDto)

      return
    } catch (error) {
      // if (error.errno === DbErrorCodes.DUPLICATE_ENTRY) {
      //   throw new BadRequestException(
      //     `The email address ${partialUser.email} is in use`
      //   )
      // }

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
