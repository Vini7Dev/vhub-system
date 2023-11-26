import 'reflect-metadata'

import { TransactionsRepositoryMethods } from '../repositories/TransactionsRepositoryMethods'
import { GetTransactionsDashboardService } from './GetTransactionsDashboardService'
import { FakeTransactionsRepository } from '../repositories/fakes/FakeTransactionsRepository'
import { TransactionOrigin } from '../infra/prisma/entities/Transaction'

let fakeTransactionsRepository: TransactionsRepositoryMethods
let getTransactionsDashboardService: GetTransactionsDashboardService

describe('GetTransactionsDashboardService', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository()

    getTransactionsDashboardService = new GetTransactionsDashboardService(
      fakeTransactionsRepository,
    )
  })

  it('should be able to retrieve transaction panel data for the entire period', async () => {
    const createdTransactions = []

    for (let month = 1; month < 4; month++) {
      for (let day = 1; day < 3; day++) {
        const transactionOrigin = day % 2 == 0 ? 0 : 1

        const transaction = {
          date: new Date(`2023/0${month}/0${day}`),
          description: `Transaction example ${Math.random()}`,
          origin_type: transactionOrigin,
          value: 100 * month,
        }

        await fakeTransactionsRepository.create(transaction)

        createdTransactions.push(transaction)
      }
    }

    const dashboardResponse = await getTransactionsDashboardService.execute({})

    expect(dashboardResponse[TransactionOrigin[0]]['01/2023']).toBe(100)
    expect(dashboardResponse[TransactionOrigin[0]]['02/2023']).toBe(200)
    expect(dashboardResponse[TransactionOrigin[0]]['03/2023']).toBe(300)
    expect(dashboardResponse[TransactionOrigin[1]]['01/2023']).toBe(100)
    expect(dashboardResponse[TransactionOrigin[1]]['02/2023']).toBe(200)
    expect(dashboardResponse[TransactionOrigin[1]]['03/2023']).toBe(300)
  })

  it('should be able to retrieve transaction dashboard data from the last 6 months', async () => {
    const createdTransactions = []

    for (let month = 1; month < 4; month++) {
      for (let day = 1; day < 3; day++) {
        const transactionOrigin = day % 2 == 0 ? 0 : 1

        const transaction = {
          date: new Date(`2023/0${month}/0${day}`),
          description: `Transaction example ${Math.random()}`,
          origin_type: transactionOrigin,
          value: 100 * month,
        }

        await fakeTransactionsRepository.create(transaction)

        createdTransactions.push(transaction)
      }
    }

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date('2023/03/01').getTime()
    })

    const dashboardResponse = await getTransactionsDashboardService.execute({
      numberOfMonths: 2
    })

    expect(dashboardResponse[TransactionOrigin[0]]['01/2023']).toBeUndefined()
    expect(dashboardResponse[TransactionOrigin[1]]['01/2023']).toBeUndefined()
    expect(dashboardResponse[TransactionOrigin[0]]['02/2023']).toBe(200)
    expect(dashboardResponse[TransactionOrigin[0]]['03/2023']).toBe(300)
    expect(dashboardResponse[TransactionOrigin[1]]['02/2023']).toBe(200)
    expect(dashboardResponse[TransactionOrigin[1]]['03/2023']).toBe(300)
  })

  it('should be able to return an empty response when no transactions exists', async () => {
    const dashboardResponse = await getTransactionsDashboardService.execute({})

    expect(dashboardResponse).toEqual({})
  })

  it('should not be able to retrieve transaction dashboard data with a number of months less than 1', async () => {
    await expect(
      getTransactionsDashboardService.execute({ numberOfMonths: 0 })
    ).rejects.toBeInstanceOf(Error)
  })
})
