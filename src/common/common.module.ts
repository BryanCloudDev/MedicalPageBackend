import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { S3Service } from './services/aws/s3.service'

@Module({
  providers: [S3Service],
  exports: [S3Service],
  imports: [ConfigModule]
})
export class CommonModule {}
