import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
  ApiTooManyRequestsResponse
} from '@nestjs/swagger'

interface authOptions {
  auth?: boolean
}

export function GenericResponses({ auth }: authOptions = { auth: false }) {
  const decorators = [
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiInternalServerErrorResponse({ description: 'Internal Server Error' }),
    ApiTooManyRequestsResponse({
      description: 'Too many requests, please try again later'
    })
  ]

  if (auth) {
    decorators.push(
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
      ApiForbiddenResponse({ description: 'Forbidden' }),
      ApiBearerAuth()
    )
  }

  return applyDecorators(...decorators)
}
