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

      fakeTransactionsRepository.create(transaction)

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
})
