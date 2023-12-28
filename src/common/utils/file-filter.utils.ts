import { Request } from 'express'

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: any
) => {
  if (!file) return callback(null, false)

  const fileExtension = file.mimetype.split('/')[1]
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif']

  if (validExtensions.includes(fileExtension)) {
    return callback(null, true)
  }

  return callback(null, false)
}
