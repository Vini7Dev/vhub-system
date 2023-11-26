import { inject, injectable } from 'tsyringe'

import { getMonthGroup, removeMonthsOfDate, setDateToFistDayOfMonth } from '@utils/dateHandlers'
import { TransactionsRepositoryMethods } from '../repositories/TransactionsRepositoryMethods'
import { TransactionOrigin } from '../infra/prisma/entities/Transaction'

interface ServiceProps {
  numberOfMonths?: number
}

interface DashboardPerOrigin {
  [transactionOrigin: string]: {
    [month: string]: number
  }
}

@injectable()
export class GetTransactionsDashboardService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: TransactionsRepositoryMethods,
  ) {}

  public async execute({ numberOfMonths }: ServiceProps) {
    const filters = {}

    if (numberOfMonths !== undefined) {
      if (numberOfMonths <= 0) {
        throw new Error('The number of months must be greater than 0!')
      }

      const currentDate = Date.now()
      const previousMonthFilter = removeMonthsOfDate(new Date(currentDate), numberOfMonths)
      const startDateInFirstDay = setDateToFistDayOfMonth(previousMonthFilter)

      Object.assign(filters, { startDate: startDateInFirstDay })
    }

    const transactions = await this.transactionsRepository.list(filters)

    const dashboardData: DashboardPerOrigin = {}

    for (const transaction of transactions) {
      const transactionOrigin = TransactionOrigin[transaction.origin_type]

      let transactionOriginGroup = dashboardData[transactionOrigin]

      if (!dashboardData[transactionOrigin]) {
        dashboardData[transactionOrigin] = {}

        transactionOriginGroup = dashboardData[transactionOrigin]
      }

      const transactionMonth = getMonthGroup(transaction.date)

      if (!transactionOriginGroup[transactionMonth]) {
        transactionOriginGroup[transactionMonth] = 0
      }

      transactionOriginGroup[transactionMonth] += transaction.value

      dashboardData[transactionOrigin] = transactionOriginGroup
    }

    return dashboardData
  }
}
