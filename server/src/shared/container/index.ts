import { container } from 'tsyringe'

import { DiskStorageProvider } from './providers/StorageProvider/implementations/DiskStorageProvider'
import { StorageProvider } from './providers/StorageProvider/models/StorageProvider'

container.registerSingleton<StorageProvider>('StorageProvider', DiskStorageProvider)
