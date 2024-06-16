import { Module } from '@nestjs/common'
import { AddressModule } from 'src/address/address.module'
import { InitService } from './init-status.service'
import { InitStatus } from './entities/init.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  providers: [InitService],
  imports: [AddressModule, TypeOrmModule.forFeature([InitStatus])]
})
export class InitModule {}
