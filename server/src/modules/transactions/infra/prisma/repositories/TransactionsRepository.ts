import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

import { CreateTransactionDTO } from '@modules/transactions/dtos/CreateTransactionDTO'
import { TransactionsRepositoryMethods } from '@modules/transactions/repositories/TransactionsRepositoryMethods'
import { Transaction } from '../entities/Transaction'
import { FindEqualTransactionDTO } from '@modules/transactions/dtos/FindEqualTransactionDTO'
import { ListFiltersDTO } from '@modules/transactions/dtos/ListFiltersDTO'

export class TransactionsRepository implements TransactionsRepositoryMethods {
  private client: Prisma.TransactionDelegate<DefaultArgs>

  constructor() {
    const prismaClient = new PrismaClient()

    this.client = prismaClient.transaction
  }

  public async list({
    originType,
    startDate,
    endDate,
  }: ListFiltersDTO): Promise<Transaction[]> {
    const filters = { date: {} }

    if (originType !== undefined) Object.assign(filters, { origin_type: originType })

    if (startDate) Object.assign(filters.date, { gte: startDate })

    if (endDate) {
      endDate.setDate(endDate.getDate() + 1)
      Object.assign(filters.date, { lte: endDate })
    }

    const transactionsList = await this.client.findMany({ where: filters })

    return transactionsList
  }

  public async findEqualTransaction({
    date,
    description,
    origin_type,
    value,
  }: FindEqualTransactionDTO): Promise<Transaction | null> {
    const equalTransaction = await this.client.findFirst({
      where: {
        date,
        description,
        origin_type,
        value,
      }
    })

    return equalTransaction
  }

  public async create({
    date,
    description,
    origin_type,
    value,
  }: CreateTransactionDTO): Promise<Transaction> {
    const createdTransaction = await this.client.create({
      data: {
        date,
        description,
        origin_type,
        value,
      }
    })

    return createdTransaction
  }
}
