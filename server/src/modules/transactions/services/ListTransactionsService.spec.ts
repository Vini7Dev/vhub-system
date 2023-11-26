/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata'

import { TransactionsRepositoryMethods } from '../repositories/TransactionsRepositoryMethods'
import { FakeTransactionsRepository } from '../repositories/fakes/FakeTransactionsRepository'
import { ListTransactionsService } from './ListTransactionsService'

let fakeTransactionsRepository: TransactionsRepositoryMethods
let listTransactionsService: ListTransactionsService

describe('ListTransactionsService', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository()

    listTransactionsService = new ListTransactionsService(fakeTransactionsRepository)
  })

  it('should be able to list transactions by origin type with date interval', async () => {
    const transactionsToCreate = []

    for (let i = 1; i < 10; i++) {
      const transaction = {
        date: new Date(`2023/01/0${i}`),
        description: `Transaction example ${Math.random()}`,
        origin_type: i % 2 == 0 ? 0 : 1,
        value: 1000,
      }

      await fakeTransactionsRepository.create(transaction)

      transactionsToCreate.push(transaction)
    }

    const transactionsList = await listTransactionsService.execute({
      originType: 0,
      startDate: new Date('2023/01/02'),
      endDate: new Date('2023/01/07'),
    })

    expect(transactionsList).toHaveLength(3)
    expect(transactionsList[0].description).toBe(transactionsToCreate[1].description)
    expect(transactionsList[1].description).toBe(transactionsToCreate[3].description)
    expect(transactionsList[2].description).toBe(transactionsToCreate[5].description)
  })

  it('should not be able to list transactions with a start date greater than the end date', async () => {
    await expect(
      listTransactionsService.execute({
        originType: 0,
        startDate: new Date('2023/01/02'),
        endDate: new Date('2023/01/01'),
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to list transactions without filters', async () => {
    await expect(
      listTransactionsService.execute({
        startDate: new Date('2023/01/02'),
        endDate: new Date('2023/01/01'),
      } as any)
    ).rejects.toBeInstanceOf(Error)

    await expect(
      listTransactionsService.execute({
        originType: 0,
        endDate: new Date('2023/01/01'),
      } as any)
    ).rejects.toBeInstanceOf(Error)

    await expect(
      listTransactionsService.execute({
        originType: 0,
        startDate: new Date('2023/01/02'),
      } as any)
    ).rejects.toBeInstanceOf(Error)
  })
})
