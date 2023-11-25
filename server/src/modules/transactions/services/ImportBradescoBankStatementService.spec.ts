import 'reflect-metadata'

import { BRADESCO_FAKE_STATEMENT } from '@shared/container/providers/PDFReaderProvider/fakes/FakeStatements'
import { StorageProvider } from '@shared/container/providers/StorageProvider/models/StorageProvider'
import { FakeStorageProvider } from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import { PDFReaderProvider } from '@shared/container/providers/PDFReaderProvider/models/PDFReaderProvider'
import { FakePDFReaderProvider } from '@shared/container/providers/PDFReaderProvider/fakes/FakePDFReaderProvider'
import { ImportBradescoBankStatementService } from './ImportBradescoBankStatementService'

let fakeStorageProvider: StorageProvider
let fakePDFReaderProvider: PDFReaderProvider
let importBradescoBankStatementService: ImportBradescoBankStatementService

describe('Import Bradesco Bank Statement', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider()
    fakePDFReaderProvider = new FakePDFReaderProvider()

    importBradescoBankStatementService = new ImportBradescoBankStatementService(
      fakeStorageProvider,
      fakePDFReaderProvider
    )
  })

  it('should be able to import transactions from a pdf', async () => {
    const readPdfSpy = jest.spyOn(fakePDFReaderProvider, 'readPDF')

    readPdfSpy.mockImplementationOnce(async () => BRADESCO_FAKE_STATEMENT)

    const insertedCount = await importBradescoBankStatementService.execute({
      file_name: '__example__.pdf',
    })

    expect(insertedCount).toBe(8)
  })

  it('should not be able to import transactions when the pdf is not provided', async () => {
    const insertedCount = await importBradescoBankStatementService.execute({})

    expect(insertedCount).toBe(0)
  })
})
