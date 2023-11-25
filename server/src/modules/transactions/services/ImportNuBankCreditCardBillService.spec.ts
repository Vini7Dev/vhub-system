import 'reflect-metadata'

import { StorageProvider } from '@shared/container/providers/StorageProvider/models/StorageProvider'
import { TransactionsRepositoryMethods } from '../repositories/TransactionsRepositoryMethods'
import { PDFReaderProvider } from '@shared/container/providers/PDFReaderProvider/models/PDFReaderProvider'
import { FakeTransactionsRepository } from '../repositories/fakes/FakeTransactionsRepository'
import { FakeStorageProvider } from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import { FakePDFReaderProvider } from '@shared/container/providers/PDFReaderProvider/fakes/FakePDFReaderProvider'
import { ImportNuBankCreditCardBillService } from './ImportNuBankCreditCardBillService'
import { FAKE_NU_BANK_CREDIT_CARD_BILL, FAKE_NU_BANK_CREDIT_CARD_BILL_WITHOUT_YEAR } from '@shared/container/providers/PDFReaderProvider/fakes/FakeNuBankCreditCartBill'

let fakeTransactionsRepository: TransactionsRepositoryMethods
let fakeStorageProvider: StorageProvider
let fakePDFReaderProvider: PDFReaderProvider
let importNuBankCreditCardBillService: ImportNuBankCreditCardBillService

describe('ImportNuBankCreditCardBillService', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository()
    fakeStorageProvider = new FakeStorageProvider()
    fakePDFReaderProvider = new FakePDFReaderProvider()

    importNuBankCreditCardBillService = new ImportNuBankCreditCardBillService(
      fakeTransactionsRepository,
      fakeStorageProvider,
      fakePDFReaderProvider
    )
  })

  it('should be able to import transactions from a pdf', async () => {
    const readPdfSpy = jest.spyOn(fakePDFReaderProvider, 'readPDF')

    readPdfSpy.mockImplementationOnce(async () => FAKE_NU_BANK_CREDIT_CARD_BILL)

    const insertedCount = await importNuBankCreditCardBillService.execute({
      file_name: '__example__.pdf',
    })

    expect(insertedCount).toBe(8)
  })

  it('should be able to import transactions from a pdf without bill year', async () => {
    const readPdfSpy = jest.spyOn(fakePDFReaderProvider, 'readPDF')

    readPdfSpy.mockImplementationOnce(async () => FAKE_NU_BANK_CREDIT_CARD_BILL_WITHOUT_YEAR)

    const insertedCount = await importNuBankCreditCardBillService.execute({
      file_name: '__example__.pdf',
    })

    expect(insertedCount).toBe(8)
  })

  it('should not be able to repeat import of transaction', async () => {
    const readPdfSpy = jest.spyOn(fakePDFReaderProvider, 'readPDF')

    readPdfSpy.mockImplementationOnce(async () => FAKE_NU_BANK_CREDIT_CARD_BILL)

    const firstInsertedCount = await importNuBankCreditCardBillService.execute({
      file_name: '__example__.pdf',
    })

    readPdfSpy.mockImplementationOnce(async () => FAKE_NU_BANK_CREDIT_CARD_BILL)

    const secondInsertedCount = await importNuBankCreditCardBillService.execute({
      file_name: '__example__.pdf',
    })

    expect(firstInsertedCount).toBe(8)
    expect(secondInsertedCount).toBe(0)
  })

  it('should not be able to import transactions when the pdf is not provided', async () => {
    const insertedCount = await importNuBankCreditCardBillService.execute({})

    expect(insertedCount).toBe(0)
  })
})
