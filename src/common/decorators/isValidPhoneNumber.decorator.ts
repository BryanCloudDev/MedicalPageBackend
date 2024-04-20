import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isString,
  registerDecorator
} from 'class-validator'
import { PhoneType } from '../types'

@ValidatorConstraint({ name: 'isValidPhoneNumber', async: false })
export class IsValidPhoneNumberConstraint
  implements ValidatorConstraintInterface
{
  readonly regexForPhoneNumber = /^\d{1,15}$/

  validate(value: string) {
    return this.validateNumber(value)
  }

  defaultMessage({ value, constraints }: ValidationArguments) {
    if (value.length < 8 || value.length > 15)
      return 'Number must be between 8 and up to 15 characters long'

    const [type] = constraints

    if (type === 'mobilePhone') {
      return `Mobile phone number must be numeric characters only. Received: ${value}`
    }

    return `Phone number must be numeric characters only. Received: ${value}`
  }

  validateNumber(value: string) {
    const MAX_CHAR_AMOUNT = 15
    const MIN_CHAR_AMOUNT = 8

    return (
      isString(value) &&
      this.regexForPhoneNumber.test(value) &&
      value.length >= MIN_CHAR_AMOUNT &&
      value.length <= MAX_CHAR_AMOUNT
    )
  }
}

export function IsValidPhoneNumber(type?: PhoneType) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [type],
      validator: IsValidPhoneNumberConstraint
    })
  }
}
