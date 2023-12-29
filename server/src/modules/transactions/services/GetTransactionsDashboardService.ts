import { inject, injectable } from 'tsyringe'

import { getMonthGroup, removeMonthsOfDate, setDateToFistDayOfMonth } from '@utils/dateHandlers'
import { TransactionsRepositoryMethods } from '../repositories/TransactionsRepositoryMethods'
import { TransactionOrigin } from '../infra/prisma/entities/Transaction'

interface ServiceProps {
  numberOfMonths?: number
}

interface DashboardPerOrigin {
  [transactionOrigin: string]: {
    [month: string]: {
      monthSum: number
      periodSum: number
    }
  }
}

interface PeriodSumPerOrigin {
  [transactionOrigin: string]: number
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

    const periodSumPerOrigin: PeriodSumPerOrigin = {}

    const dashboardData: DashboardPerOrigin = {}

    for (const transaction of transactions) {
      const transactionOrigin = TransactionOrigin[transaction.origin_type]

      let transactionOriginGroup = dashboardData[transactionOrigin]

      if (!dashboardData[transactionOrigin]) {
        dashboardData[transactionOrigin] = {}
        transactionOriginGroup = dashboardData[transactionOrigin]
      }

      if (!periodSumPerOrigin[transactionOrigin]) {
        periodSumPerOrigin[transactionOrigin] = 0
      }

      const transactionMonth = getMonthGroup(transaction.date)

      if (!transactionOriginGroup[transactionMonth]) {
        transactionOriginGroup[transactionMonth] = {
          periodSum: periodSumPerOrigin[transactionOrigin],
          monthSum: 0,
        }
      }

      periodSumPerOrigin[transactionOrigin] += transaction.value
      transactionOriginGroup[transactionMonth].periodSum = periodSumPerOrigin[transactionOrigin]
      transactionOriginGroup[transactionMonth].monthSum += transaction.value

      dashboardData[transactionOrigin] = transactionOriginGroup
    }

    return dashboardData
  }
}
