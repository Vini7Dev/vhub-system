import { CreateTransactionDTO } from '@modules/transactions/dtos/CreateTransactionDTO'
import { TransactionsRepositoryMethods } from '../TransactionsRepositoryMethods'
import { Transaction } from '../../infra/prisma/entities/Transaction'
import { FindEqualTransactionDTO } from '@modules/transactions/dtos/FindEqualTransactionDTO'


export class FakeTransactionsRepository implements TransactionsRepositoryMethods {
  private transactions: Transaction[] = []

  public async findEqualTransaction(data: FindEqualTransactionDTO): Promise<Transaction | null> {
    const equalTransaction = this.transactions.find(transaction => {
      return transaction.description === data.description
        && transaction.origin_type === data.origin_type
        && transaction.value === data.value
    })

    return equalTransaction ?? null
  }

  public async create({
    date,
    description,
    origin_type,
    value,
  }: CreateTransactionDTO): Promise<Transaction> {
    const createdTransaction = {
      id: this.transactions.length,
      date,
      description,
      origin_type,
      value,
      created_at: new Date(),
    }

    this.transactions.push(createdTransaction)

    return createdTransaction
  }
}
