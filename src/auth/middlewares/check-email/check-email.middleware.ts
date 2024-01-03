import { NextFunction, Request, Response } from 'express'
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

@Injectable()
export class CheckEmailMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email as string

    const user = await this.userService.findByEmail(email)

    if (user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: `Email ${email} already registered` })
    }

    next()
  }
}
