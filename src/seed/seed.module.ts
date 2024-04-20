import { Module } from '@nestjs/common'
import { SeedService } from './seed.service'
import { SeedController } from './seed.controller'
import { AddressModule } from 'src/address/address.module'

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AddressModule]
})
export class SeedModule {}
