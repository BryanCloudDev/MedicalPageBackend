import { File, FileResponse } from '../types'

export interface StorageService {
  uploadFile(folder: string, file: File): Promise<string>
  getFile(folder: string, key: string): Promise<FileResponse>
  updateFile(folder: string, key: string, file: File): Promise<string>
  deleteFile(folder: string, key: string): Promise<boolean>
}
