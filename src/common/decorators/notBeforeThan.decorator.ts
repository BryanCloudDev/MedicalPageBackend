import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint
} from 'class-validator'
import * as moment from 'moment'
import { currentDate } from '../utils'

@ValidatorConstraint({ name: 'notBeforeThan', async: false })
export class NotBeforeThanConstraint implements ValidatorConstraintInterface {
  validate(value: Date) {
    if (!value) {
      return false
    }
    const date = moment(value)
    return date.isSameOrAfter(currentDate())
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} should not be in the past`
  }
}

export function NotBeforeThan() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      validator: NotBeforeThanConstraint
    })
  }
}
