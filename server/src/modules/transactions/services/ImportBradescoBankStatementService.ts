import { inject, injectable } from 'tsyringe'

import { StorageProvider } from '@shared/container/providers/StorageProvider/models/StorageProvider'

interface ServiceProps {
  file_name?: string
}

@injectable()
export class ImportBradescoBankStatementService {
  constructor (
    @inject('StorageProvider')
    private storageProvider: StorageProvider
  ) {}

  public async execute({ file_name }: ServiceProps) {
    if (!file_name) return 0

    const filePath = await this.storageProvider.saveFile(file_name)

    console.log('===> filePath', filePath)

    await this.storageProvider.deleteFile(file_name)

    return 0
  }
}
