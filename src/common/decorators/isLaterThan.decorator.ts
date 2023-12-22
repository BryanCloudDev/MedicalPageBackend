import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator
} from 'class-validator'
import * as moment from 'moment'
import { currentDate } from '../utils'

@ValidatorConstraint({ name: 'isLaterThan', async: false })
export class IsLaterThanConstraint implements ValidatorConstraintInterface {
  validate(value: string, { constraints }: ValidationArguments) {
    const [date] = constraints
    const isLater = moment(value).isAfter(date)

    return !isLater
  }

  defaultMessage({ value, constraints }: ValidationArguments) {
    const [date] = constraints
    const stringDateProvided = moment(value).format('MMM, DD, YYYY')
    const stringDateLimit = moment(date).format('MMM, DD, YYYY')

    return `The date ${stringDateProvided} must not be later than today's date ${stringDateLimit}`
  }
}

export function IsLaterThan(date: Date = currentDate()) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [date],
      validator: IsLaterThanConstraint
    })
  }
}
