import { inject, injectable } from 'tsyringe'

import { Transaction, TransactionOrigin } from '../infra/prisma/entities/Transaction'
import { TransactionsRepositoryMethods } from '../repositories/TransactionsRepositoryMethods'

interface ServiceProps {
  originType: TransactionOrigin
  startDate: Date
  endDate: Date
}

@injectable()
export class ListTransactionsService {
  constructor (
    @inject('TransactionsRepository')
    private transactionsRepository: TransactionsRepositoryMethods,
  ) {}

  public async execute({
    originType,
    startDate,
    endDate,
  }: ServiceProps): Promise<Transaction[]> {
    if (startDate > endDate) {
      throw new Error('The start date must be less than the end date!')
    }

    const transactionsList = await this.transactionsRepository.list({
      originType,
      startDate,
      endDate,
    })

    return transactionsList
  }
}
