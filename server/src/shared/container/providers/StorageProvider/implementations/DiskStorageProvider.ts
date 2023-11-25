import fs from 'fs'
import path from 'path'

import { uploadConfig } from '@configs/upload'

import { StorageProvider } from '../models/StorageProvider'

export class DiskStorageProvider implements StorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file)
    )

    return `${uploadConfig.uploadsFolder}/${file}`
  }

  public async deleteFile(file: string): Promise<void> {
    const fileDir = path.resolve(uploadConfig.uploadsFolder, file)

    try {
      await fs.promises.stat(fileDir)
    } catch {
      return
    }

    await fs.promises.unlink(fileDir)
  }
}
