import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PhoneCode } from './entities/phone-code.entity'
import { Address } from './entities/address.entity'
import { Country } from './entities/country.entity'
import { State } from './entities/state.entity'
import { City } from './entities/city.entity'
import {
  AddressService,
  CityService,
  CountryService,
  PhoneCodeService,
  StateService
} from './service'
import { PhoneCodeController } from './controllers/phone-code.controller'
import { ConfigModule } from '@nestjs/config'
import { CountryController } from './controllers/country.controller'
import { StateController } from './controllers/state.controller'
import { CityController } from './controllers/city.controller'
import { AddressController } from './controllers/address.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Address, Country, State, City, PhoneCode]),
    ConfigModule
  ],
  providers: [
    AddressService,
    PhoneCodeService,
    CityService,
    CountryService,
    StateService
  ],
  exports: [
    AddressService,
    PhoneCodeService,
    CityService,
    CountryService,
    StateService
  ],
  controllers: [
    PhoneCodeController,
    AddressController,
    CountryController,
    StateController,
    CityController
  ]
})
export class AddressModule {}
