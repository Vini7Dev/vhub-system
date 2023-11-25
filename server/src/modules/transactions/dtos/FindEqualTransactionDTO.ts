import { TransactionOrigin } from '../infra/prisma/entities/Transaction'

export interface FindEqualTransactionDTO {
  description: string
  value: number
  date: Date
  origin_type: TransactionOrigin
}
