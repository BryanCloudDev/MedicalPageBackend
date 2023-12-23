import { Readable } from 'stream'

export interface StorageService {
  uploadFile(folder: string, file: Express.Multer.File): Promise<string>
  deleteFile(folder: string, key: string): Promise<boolean>
  updateFile(
    folder: string,
    key: string,
    file: Express.Multer.File
  ): Promise<string>
  getFile(folder: string, key: string): Promise<Readable>
}
