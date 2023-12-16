import { Module } from '@nestjs/common'
import { AddressService } from './address.service'
import { AddressController } from './address.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Address } from './entities/address.entity'
import { Country } from './entities/country.entity'
import { State } from './entities/state.entity'
import { City } from './entities/city.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Address, Country, State, City])],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
