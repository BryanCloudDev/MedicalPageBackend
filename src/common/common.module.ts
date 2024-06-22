import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { S3Service } from './services/aws/s3.service'
import { EmailService } from './services/email/email.service'

@Module({
  providers: [S3Service, EmailService],
  exports: [S3Service, EmailService],
  imports: [ConfigModule]
})
export class CommonModule {}
