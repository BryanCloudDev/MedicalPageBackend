import {
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { LayerError } from '../enums'
import { UnauthorizedException } from '@nestjs/common'

export const errorHandler = (
  logger: Logger,
  error: any,
  level = LayerError.SERVICE
): never => {
  logger.error(error.message)

  throw new Error(
    JSON.stringify({
      message: error.message,
      level
    })
  )
}

export const internalServerError = (message: string) => {
  throw new InternalServerErrorException(message)
}

export const notFoundError = (message: string) => {
  throw new NotFoundException(message)
}

export const unauthorizedError = (message: string) => {
  throw new UnauthorizedException(message)
}
