import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PhoneCode } from 'src/address/entities/phone-code.entity'
import { Address } from 'src/address/entities/address.entity'
import { UpdateUserDto } from './dto/update-user.dto'
import { exceptionHandler } from 'src/common/utils'
import { UserRepository } from './user.repository'
import { User } from './entities/user.entity'
import { Roles } from './enums'
import { AddressService } from 'src/address/service'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly addressService: AddressService,
    private readonly configService: ConfigService
  ) {}

  private readonly logger = new Logger(UserService.name)
  private readonly take = this.configService.get<number>('ENTITIES_LIMIT')
  private readonly skip = this.configService.get<number>('ENTITIES_SKIP')

  async create(
    userPartial: Partial<User>,
    regionNumber: PhoneCode,
    address: Address,
    role: Roles
  ): Promise<User> {
    const user = this.userRepository.create(
      userPartial,
      regionNumber,
      address,
      role
    )
    return user
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const patient = await this.userRepository.findByEmail(email)
      return patient
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    try {
      const patient = await this.userRepository.findByEmailWithPassword(email)

      return patient
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findByIdWithRelations(id)

      if (!user) {
        throw new NotFoundException(`User with id ${id} was not found`)
      }

      return user
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      const user = await this.findById(id)

      if (!user.isActive) {
        throw new BadRequestException(`User is already inactive`)
      }

      await this.userRepository.softDeleteById(id)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateById(
    id: string,
    { address, ...partialUpdateUserDto }: UpdateUserDto
  ): Promise<void> {
    try {
      const user = await this.findById(id)

      this.checkIfUserExists(id, user)

      if (address) {
        await this.addressService.updateById(user.address.id, address)
      }

      await this.userRepository.updateById(id, partialUpdateUserDto)

      return
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(
    role: Roles,
    skip = this.skip,
    take = this.take
  ): Promise<User[]> {
    try {
      const users = await this.userRepository.findAllBasedOnRole(
        role,
        skip,
        take
      )

      return users
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  private checkIfUserExists(id: string, user: User | undefined): void | never {
    if (!user) {
      throw new NotFoundException(`The user with ${id} was not found`)
    }
  }
}
