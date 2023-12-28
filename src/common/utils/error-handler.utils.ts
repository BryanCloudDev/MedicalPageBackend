import { Logger } from '@nestjs/common'

export const errorHandler = (logger: Logger, error: any): never => {
  logger.error(error.message)
  throw new Error(error.message)
}
