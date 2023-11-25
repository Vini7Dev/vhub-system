import { Transaction } from '../infra/prisma/entities/Transaction'
import { CreateTransactionDTO } from '../dtos/CreateTransactionDTO'
import { FindEqualTransactionDTO } from '../dtos/FindEqualTransactionDTO'

export interface TransactionsRepositoryMethods {
  findEqualTransaction(data: FindEqualTransactionDTO): Promise<Transaction | null>
  create(data: CreateTransactionDTO): Promise<Transaction>
}
