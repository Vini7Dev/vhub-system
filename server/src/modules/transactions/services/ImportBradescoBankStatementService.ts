import { inject, injectable } from 'tsyringe'

import { StorageProvider } from '@shared/container/providers/StorageProvider/models/StorageProvider'

interface ServiceProps {
  file?: Express.Multer.File
}

@injectable()
export class ImportBradescoBankStatementService {
  constructor (
    @inject('StorageProvider')
    private storageProvider: StorageProvider
  ) {}

  public async execute({ file }: ServiceProps) {
    if (!file) return 0

    const filePath = await this.storageProvider.saveFile(file.filename)

    console.log('===> filePath', filePath)

    await this.storageProvider.deleteFile(file.filename)

    return 0
  }
}
