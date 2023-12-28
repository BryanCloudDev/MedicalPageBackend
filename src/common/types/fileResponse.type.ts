import { Readable } from 'stream'

export type FileResponse = {
  file: Readable
  contentType: string
  contentLength: number
}
