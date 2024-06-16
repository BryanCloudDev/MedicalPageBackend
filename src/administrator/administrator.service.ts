import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { UpdateAdministratorDto } from './dto/update-administrator.dto'
import { User } from 'src/user/entities/user.entity'
import { Administrator } from './entities/administrator.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { exceptionHandler } from 'src/common/utils'
import { Repository } from 'typeorm'
import { FolderType } from 'src/file/enums/folder.enum'
import { FileService } from 'src/file/file.service'
import { UserService } from 'src/user/user.service'
import { PaginationUserDto } from 'src/patient/dto'
import { Roles } from 'src/user/enums'

@Injectable()
export class AdministratorService {
  constructor(
    @InjectRepository(Administrator)
    private readonly administratorRepository: Repository<Administrator>,
    private readonly userService: UserService,
    private readonly fileService: FileService
  ) {}

  private readonly logger = new Logger(AdministratorService.name)

  async uploadPhoto(file: Express.Multer.File, user: User) {
    const { id } = user
    try {
      if (!file) throw new BadRequestException('File is required')

      const photo = await this.fileService.uploadFile(FolderType.PATIENT, file)

      await this.userService.updateById(id, {
        photo
      })
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async create(user: User) {
    try {
      const administratorInstance = this.administratorRepository.create({
        user
      })
      const administrator = await this.administratorRepository.save(
        administratorInstance
      )

      return administrator
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findAll(filterDto: PaginationUserDto) {
    try {
      const { offset, limit } = filterDto

      const administrators = await this.userService.findAll(
        Roles.ADMINISTRATOR,
        offset,
        limit
      )

      return administrators.map((administrator) =>
        this.getAdministratorProfile(administrator)
      )
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async findById(id: string) {
    try {
      const administrator = await this.userService.findById(id)

      return administrator
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  getAdministratorProfile(user: User) {
    delete user.administrator

    return user
  }

  async updateById(id: string, updateAdministratorDto: UpdateAdministratorDto) {
    await this.userService.updateById(id, updateAdministratorDto)
  }

  async deleteById(id: string) {
    try {
      await this.userService.deleteById(id)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
