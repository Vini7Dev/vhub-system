import crypto from 'crypto'
import multer from 'multer'

import {
  DISK_STORAGE_UPLOADS_FOLDER,
  MULTER_TEMP_FOLDER
} from '../utils/constants'

export const uploadConfig = {
  tempFolder: MULTER_TEMP_FOLDER,
  uploadsFolder: DISK_STORAGE_UPLOADS_FOLDER,
  storage: multer.diskStorage({
    destination: MULTER_TEMP_FOLDER,
    filename: (_, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  }),
}

export const multerUpload = multer(uploadConfig)
