import path from 'path'

// SERVER AND CORS
export const SERVER_PORT = process.env.SERVER_PORT ?? 3333
export const SERVER_URL = `http://localhost:${SERVER_PORT}`
export const AVAILABLE_CORS_ORIGIN = 'http://localhost:3000'

// STORAGE
export const MULTER_TEMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp')
export const DISK_STORAGE_UPLOADS_FOLDER = path.resolve(__dirname,'..', 'uploads')

// HTTP STATUS CODES
export const HTTP_STATUS_CODES = {
  created: 201,
}
