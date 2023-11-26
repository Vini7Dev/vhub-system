/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata'

import { ExportProvider } from '@shared/container/providers/ExportProvider/models/ExportProvider'
import { TransactionsRepositoryMethods } from '../repositories/TransactionsRepositoryMethods'
import { ExportTransactionsService } from './ExportTransactionsService'
import { FakeTransactionsRepository } from '../repositories/fakes/FakeTransactionsRepository'
import { FakeExportProvider } from '@shared/container/providers/ExportProvider/fakes/FakeExportProvider'

let fakeTransactionsRepository: TransactionsRepositoryMethods
let fakeExportProvider: ExportProvider
let exportTransactionsService: ExportTransactionsService

describe('ExportTransactionsService', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository()
    fakeExportProvider = new FakeExportProvider()

    exportTransactionsService = new ExportTransactionsService(
      fakeTransactionsRepository,
      fakeExportProvider,
    )
  })

  it('should be able to export transactions to csv with filters', async () => {
    const spyRepositoryList = jest.spyOn(fakeTransactionsRepository, 'list')

    const transactionsToCreate = []

    for (let i = 1; i < 10; i++) {
      const transaction = {
        date: new Date(`2023/01/0${i}`),
        description: `Transaction example ${Math.random()}`,
        origin_type: i % 2 == 0 ? 0 : 1,
        value: 1000,
      }

      const createdTransaction = await fakeTransactionsRepository.create(transaction)

      transactionsToCreate.push(createdTransaction)
    }

    const filePath = await exportTransactionsService.execute({
      originType: 0,
      startDate: new Date('2023/01/02'),
      endDate: new Date('2023/01/07'),
    })

    expect(filePath).toBe('/file_path')
    expect(spyRepositoryList).toHaveBeenCalledWith({
      originType: 0,
      startDate: new Date('2023/01/02'),
      endDate: new Date('2023/01/07'),
    })
  })

  it('should be able to export transactions to csv without filters', async () => {
    const spyRepositoryList = jest.spyOn(fakeTransactionsRepository, 'list')

    const transactionsToCreate = []

    for (let i = 1; i < 10; i++) {
      const transaction = {
        date: new Date(`2023/01/0${i}`),
        description: `Transaction example ${Math.random()}`,
        origin_type: i % 2 == 0 ? 0 : 1,
        value: 1000,
      }

      const createdTransaction = await fakeTransactionsRepository.create(transaction)

      transactionsToCreate.push(createdTransaction)
    }

    const filePath = await exportTransactionsService.execute({})

    expect(filePath).toBe('/file_path')
    expect(spyRepositoryList).toHaveBeenCalledWith({
      originType: undefined,
      startDate: undefined,
      endDate: undefined,
    })
  })

  it('should not be able to export transactions with a start date greater than the end date', async () => {
    await expect(
      exportTransactionsService.execute({
        originType: 0,
        startDate: new Date('2023/01/02'),
        endDate: new Date('2023/01/01'),
      } as any)
    ).rejects.toBeInstanceOf(Error)
  })
})
