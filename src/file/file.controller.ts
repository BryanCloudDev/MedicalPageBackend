import { Response } from 'express'
import { Controller, Get, Logger, Param, Res } from '@nestjs/common'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  private readonly logger = new Logger(FileController.name)

  @Get(':folder/:fileName')
  async getFile(
    @Param('folder') folder: string,
    @Param('fileName') fileName: string,
    @Res() res: Response
  ) {
    try {
      const { file, contentLength, contentType } =
        await this.fileService.getFile(folder, fileName)

      res.setHeader('Content-Type', contentType)
      res.setHeader('Content-Length', contentLength)

      file.pipe(res)
    } catch (error) {
      res
        .status(404)
        .json({ message: `Image with path ${folder}/${fileName} not found` })
      this.logger.error(error)
    }
  }
}
