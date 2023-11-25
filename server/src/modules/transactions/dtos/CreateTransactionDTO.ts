import { TransactionOrigin } from '../infra/prisma/entities/Transaction'

export interface CreateTransactionDTO {
  description: string
  value: number
  date: Date
  origin_type: TransactionOrigin
}
