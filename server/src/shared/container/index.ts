import { container } from 'tsyringe'

import { DiskStorageProvider } from './providers/StorageProvider/implementations/DiskStorageProvider'
import { StorageProvider } from './providers/StorageProvider/models/StorageProvider'
import { PDFReaderProvider } from './providers/PDFReaderProvider/models/PDFReaderProvider'
import { Pdf2HtmlProvider } from './providers/PDFReaderProvider/implementations/Pdf2HtmlProvider'

container.registerSingleton<StorageProvider>('StorageProvider', DiskStorageProvider)
container.registerSingleton<PDFReaderProvider>('PDFReaderProvider', Pdf2HtmlProvider)
