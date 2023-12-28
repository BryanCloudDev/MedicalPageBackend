import { Module } from '@nestjs/common'
import { FileController } from './file.controller'
import { CommonModule } from 'src/common/common.module'
import { FileService } from './file.service'

@Module({
  controllers: [FileController],
  imports: [CommonModule],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
