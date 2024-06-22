import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'
import { errorHandler } from 'src/common/utils'

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  private readonly logger = new Logger(EmailService.name)

  private readonly transporter = nodemailer.createTransport({
    host: this.configService.get('EMAIL_HOST'),
    port: this.configService.get<number>('EMAIL_PORT'),
    secureConnection: true,
    secure: true, // true since port is 465 for TLS connection
    auth: {
      user: this.configService.get('EMAIL_USERNAME'),
      pass: this.configService.get('EMAIL_PASSWORD')
    },
    tls: {
      ciphers: 'SSLv3' // required for Hostinger
    },
    requireTLS: true,
    connectionTimeout: 10000,
    debug: true //
  })

  async sendEmail(mailOptions: nodemailer.SendMailOptions) {
    try {
      // check connection to smtp server
      await this.transporter.verify()

      // send email
      await this.transporter.sendMail(mailOptions)
    } catch (error) {
      errorHandler(this.logger, error)
    }
  }
}
