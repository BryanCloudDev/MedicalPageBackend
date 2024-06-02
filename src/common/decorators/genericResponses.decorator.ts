import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse
} from '@nestjs/swagger'

interface authOptions {
  auth?: boolean
}

export function GenericResponses({ auth }: authOptions = { auth: false }) {
  const decorators = [
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  ]

  if (auth) {
    decorators.push(
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
      ApiForbiddenResponse({ description: 'Forbidden' })
    )
  }

  return applyDecorators(...decorators)
}
