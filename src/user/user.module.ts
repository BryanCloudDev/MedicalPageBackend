import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { AddressModule } from 'src/address/address.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule, AddressModule],
  providers: [UserService],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
