import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { PhoneCode } from 'src/address/entities/phone-code.entity'
import { Address } from 'src/address/entities/address.entity'
import { currentDate } from 'src/common/utils'
import { User } from './entities/user.entity'
import { Roles } from './enums'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(
    userPartial: Partial<User>,
    regionNumber: PhoneCode,
    address: Address,
    role: Roles
  ): Promise<User> {
    const userInstance = this.userRepository.create({
      ...userPartial,
      role,
      regionNumber,
      address
    })

    const user = await this.userRepository.save(userInstance)

    return user
  }

  async findAllBasedOnRole(
    role: Roles,
    skip: number,
    take: number
  ): Promise<User[]> {
    const users = await this.userRepository.find({
      where: { role },
      skip,
      take,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true
      }
    })

    return users
  }

  async findByEmail(email: string): Promise<User> {
    const patient = await this.userRepository.findOneBy({ email })
    return patient
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    const patient = await this.userRepository.findOne({
      where: { email },
      select: { password: true, id: true, isActive: true }
    })

    return patient
  }

  async findByIdWithRelations(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id
      },
      relations: [
        'address',
        'regionNumber',
        'patient',
        'doctor',
        'administrator',
        'doctor.specialty'
      ]
    })

    return user
  }

  async softDeleteById(id: string): Promise<void> {
    await this.userRepository.update(id, {
      isActive: false,
      deletedOn: currentDate()
    })
  }

  async updateById(id: string, updateUserDto: Partial<User>): Promise<void> {
    await this.userRepository.update(id, updateUserDto)
  }
}
