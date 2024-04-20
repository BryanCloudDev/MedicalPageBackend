import { Injectable, Logger } from '@nestjs/common'
import { S3Service } from 'src/common/services/aws/s3.service'
import { File, FileResponse } from 'src/common/types'
import { exceptionHandler } from 'src/common/utils'

@Injectable()
export class FileService {
  constructor(readonly s3Service: S3Service) {}

  private readonly logger = new Logger(FileService.name)

  async uploadFile(folder: string, file: File): Promise<string> {
    try {
      return await this.s3Service.uploadFile(folder, file)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async getFile(folder: string, key: string): Promise<FileResponse> {
    try {
      return await this.s3Service.getFile(folder, key)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async deleteFile(folder: string, key: string): Promise<boolean> {
    try {
      return await this.s3Service.deleteFile(folder, key)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  async updateFile(folder: string, key: string, file: File): Promise<string> {
    try {
      return await this.s3Service.updateFile(folder, key, file)
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }
}
