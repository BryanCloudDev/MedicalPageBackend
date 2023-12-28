import { Readable } from 'stream'
import { v4 } from 'uuid'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  PutObjectCommand,
  S3Client,
  HeadObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand
} from '@aws-sdk/client-s3'
import { StorageService } from 'src/common/interfaces'
import { File, FileResponse } from 'src/common/types'
import { errorHandler } from 'src/common/utils'

@Injectable()
export class S3Service implements StorageService {
  constructor(readonly configService: ConfigService) {}

  private readonly logger = new Logger(S3Service.name)
  private readonly bucketName = this.configService.get('AWS_BUCKET_NAME')
  private readonly client = new S3Client({
    region: this.configService.get('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
    }
  })

  async uploadFile(folder: string, file: File): Promise<string> {
    try {
      const fileId = v4()
      const fileExtension = file.mimetype.split('/')[1]
      const newFileName = `${fileId}.${fileExtension}`

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: `${folder}/${newFileName}`,
        Body: file.buffer
      })

      await this.client.send(command)

      return newFileName
    } catch (error) {
      errorHandler(this.logger, error)
    }
  }

  async getFile(folder: string, key: string): Promise<FileResponse> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: `${folder}/${key}`
      })

      const { Body, ContentType, ContentLength } =
        await this.client.send(command)

      return {
        file: Body as Readable,
        contentType: ContentType,
        contentLength: ContentLength
      }
    } catch (error) {
      errorHandler(this.logger, error)
    }
  }

  async deleteFile(folder: string, key: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: `${folder}/${key}`
      })

      await this.headObject(key)

      await this.client.send(command)

      return true
    } catch (error) {
      if (error.$metadata.httpStatusCode === 404) {
        return false
      }
      errorHandler(this.logger, error)
    }
  }

  async updateFile(folder: string, key: string, file: File): Promise<string> {
    const fileName = await this.uploadFile(folder, file)
    await this.deleteFile(folder, key)

    return fileName
  }

  private async headObject(key: string) {
    const result = await this.client.send(
      new HeadObjectCommand({
        Bucket: this.bucketName,
        Key: key
      })
    )

    return result
  }
}
