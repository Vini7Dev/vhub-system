import { TransactionOrigin } from '../infra/prisma/entities/Transaction'

export interface ListFiltersDTO {
  originType?: TransactionOrigin
  startDate?: Date
  endDate?: Date
}
