import 'reflect-metadata'

import * as dateFormatter from '@utils/dateHandlers'

import { FAKE_BRADESCO_BANK_STATEMENT } from '@shared/container/providers/PDFReaderProvider/fakes/FakeBradescoBankStatement'
import { StorageProvider } from '@shared/container/providers/StorageProvider/models/StorageProvider'
import { FakeStorageProvider } from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import { PDFReaderProvider } from '@shared/container/providers/PDFReaderProvider/models/PDFReaderProvider'
import { FakePDFReaderProvider } from '@shared/container/providers/PDFReaderProvider/fakes/FakePDFReaderProvider'
import { ImportBradescoBankStatementService } from './ImportBradescoBankStatementService'
import { TransactionsRepositoryMethods } from '../repositories/TransactionsRepositoryMethods'
import { FakeTransactionsRepository } from '../repositories/fakes/FakeTransactionsRepository'

let fakeTransactionsRepository: TransactionsRepositoryMethods
let fakeStorageProvider: StorageProvider
let fakePDFReaderProvider: PDFReaderProvider
let importBradescoBankStatementService: ImportBradescoBankStatementService

describe('ImportBradescoBankStatementService', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository()
    fakeStorageProvider = new FakeStorageProvider()
    fakePDFReaderProvider = new FakePDFReaderProvider()

    importBradescoBankStatementService = new ImportBradescoBankStatementService(
      fakeTransactionsRepository,
      fakeStorageProvider,
      fakePDFReaderProvider
    )
  })

  it('should be able to import transactions from a pdf', async () => {
    const readPdfSpy = jest.spyOn(fakePDFReaderProvider, 'readPDF')

    readPdfSpy.mockImplementationOnce(async () => [...FAKE_BRADESCO_BANK_STATEMENT])

    const insertedCount = await importBradescoBankStatementService.execute({
      file_name: '__example__.pdf',
    })

    expect(insertedCount).toBe(8)
  })

  it('should not be able to repeat import of transaction', async () => {
    const brDateStringToDateSpy = jest.spyOn(dateFormatter, 'brDateStringToDate')

    brDateStringToDateSpy.mockImplementation(() => new Date('2023/01/01'))

    const readPdfSpy = jest.spyOn(fakePDFReaderProvider, 'readPDF')

    readPdfSpy.mockImplementationOnce(async () => [...FAKE_BRADESCO_BANK_STATEMENT])

    const firstInsertedCount = await importBradescoBankStatementService.execute({
      file_name: '__example__.pdf',
    })

    readPdfSpy.mockImplementationOnce(async () => [...FAKE_BRADESCO_BANK_STATEMENT])

    const secondInsertedCount = await importBradescoBankStatementService.execute({
      file_name: '__example__.pdf',
    })

    expect(firstInsertedCount).toBe(8)
    expect(secondInsertedCount).toBe(0)
  })

  it('should not be able to import transactions when the pdf is not provided', async () => {
    const insertedCount = await importBradescoBankStatementService.execute({})

    expect(insertedCount).toBe(0)
  })
})
