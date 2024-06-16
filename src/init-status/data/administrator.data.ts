import * as moment from 'moment'
import { CreateAdministratorDto } from 'src/administrator/dto/create-administrator.dto'

export const administrator: CreateAdministratorDto = {
  firstName: 'John',
  lastName: 'Doe',
  mobilePhoneNumber: '78787878',
  regionNumberId: '',
  email: 'admin@email.com',
  password: 'StrongP@ssword123',
  birthDate: moment('2021-02-01T12:00:00.000Z').toDate()
}
