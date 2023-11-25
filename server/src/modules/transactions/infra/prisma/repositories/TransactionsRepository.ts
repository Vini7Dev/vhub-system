import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

import { CreateTransactionDTO } from '@modules/transactions/dtos/CreateTransactionDTO'
import { TransactionsRepositoryMethods } from '@modules/transactions/repositories/TransactionsRepositoryMethods'
import { Transaction } from '../entities/Transaction'
import { FindEqualTransactionDTO } from '@modules/transactions/dtos/FindEqualTransactionDTO'

export class TransactionsRepository implements TransactionsRepositoryMethods {
  private client: Prisma.TransactionDelegate<DefaultArgs>

  constructor() {
    const prismaClient = new PrismaClient()

    this.client = prismaClient.transaction
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
