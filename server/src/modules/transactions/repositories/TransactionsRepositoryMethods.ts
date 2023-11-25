import { Transaction } from '../infra/prisma/entities/Transaction'
import { CreateTransactionDTO } from '../dtos/CreateTransactionDTO'
import { FindEqualTransactionDTO } from '../dtos/FindEqualTransactionDTO'
import { ListFiltersDTO } from '../dtos/ListFiltersDTO'

export interface TransactionsRepositoryMethods {
  list(filters: ListFiltersDTO): Promise<Transaction[]>
  findEqualTransaction(data: FindEqualTransactionDTO): Promise<Transaction | null>
  create(data: CreateTransactionDTO): Promise<Transaction>
}
