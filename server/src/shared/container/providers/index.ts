import { container } from 'tsyringe'

import { DiskStorageProvider } from './StorageProvider/implementations/DiskStorageProvider'
import { StorageProvider } from './StorageProvider/models/StorageProvider'
import { PDFReaderProvider } from './PDFReaderProvider/models/PDFReaderProvider'
import { Pdf2HtmlProvider } from './PDFReaderProvider/implementations/Pdf2HtmlProvider'
import { ImportExportProvider } from './ImportExportProvider/models/ImportExportProvider'
import { CSVImportExportProvider } from './ImportExportProvider/implementations/CSVImportExportProvider'

container.registerSingleton<StorageProvider>('StorageProvider', DiskStorageProvider)
container.registerSingleton<PDFReaderProvider>('PDFReaderProvider', Pdf2HtmlProvider)
container.registerSingleton<ImportExportProvider>('ImportExportProvider', CSVImportExportProvider)
