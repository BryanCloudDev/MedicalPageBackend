import { Module } from '@nestjs/common'
import { AddressService } from './address.service'
import { AddressController } from './address.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Address } from './entities/address.entity'
import { Country } from './entities/country.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Address, Country])],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
