import { NextFunction, Request, Response } from 'express'
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { DoctorsService } from 'src/doctors/doctors.service'
import { PatientService } from 'src/patient/patient.service'
import { User } from 'src/common/entities'

@Injectable()
export class CheckEmailMiddleware implements NestMiddleware {
  constructor(
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorsService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const email = String(req.fields.email)
    const pathArray = req.url.split('/')
    const userType = pathArray[pathArray.length - 1]

    let user: User

    if (userType === 'patient') {
      user = await this.patientService.findByEmail(email)
    }

    if (userType === 'doctor') {
      // user = await this.doctorService.findByEmail(email)
    }

    if (user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: `Email ${email} already registered` })
    }

    next()
  }
}
