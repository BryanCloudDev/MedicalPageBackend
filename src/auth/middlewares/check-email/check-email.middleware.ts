import { NextFunction, Request, Response } from 'express'
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class CheckEmailMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email as string

    let user: User

    try {
      user = await this.userService.findByEmail(email)
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message })
    }

    if (user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: `Email ${email} already registered` })
    }

    next()
  }
}
