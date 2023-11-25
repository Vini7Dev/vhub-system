import { StorageProvider } from '../models/StorageProvider'

export class FakeStorageProvider implements StorageProvider {
  private storage: string[] = []

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file)

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const fileIndex = this.storage.findIndex(fileSaved => fileSaved === file)

    this.storage.slice(fileIndex, 1)
  }
}
