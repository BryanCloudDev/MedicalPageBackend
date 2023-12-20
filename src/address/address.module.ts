import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AddressController } from './address.controller'
import { PhoneCode } from './entities/phone-code.entity'
import { Address } from './entities/address.entity'
import { Country } from './entities/country.entity'
import { AddressService } from './address.service'
import { State } from './entities/state.entity'
import { City } from './entities/city.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Address, Country, State, City, PhoneCode])
  ],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
