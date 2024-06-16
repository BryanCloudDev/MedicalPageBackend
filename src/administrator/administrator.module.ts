import { Module } from '@nestjs/common'
import { AdministratorService } from './administrator.service'
import { AdministratorController } from './administrator.controller'
import { Administrator } from './entities/administrator.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileModule } from 'src/file/file.module'
import { UserModule } from 'src/user/user.module'

@Module({
  controllers: [AdministratorController],
  providers: [AdministratorService],
  imports: [TypeOrmModule.forFeature([Administrator]), FileModule, UserModule],
  exports: [AdministratorService]
})
export class AdministratorModule {}
