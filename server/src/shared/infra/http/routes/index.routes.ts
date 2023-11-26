import { Router } from 'express'

import { transactionRoutes } from '@modules/transactions/infra/http/routes/transaction.routes'
import { exportTransactions } from '@modules/transactions/infra/http/routes/exportTransactions.routes'
import { bradescoBankRoutes } from '@modules/transactions/infra/http/routes/bradescobank.routes'
import { nuBankRoutes } from '@modules/transactions/infra/http/routes/nubank.routes'

export const appRoutes = Router()

appRoutes.use('/transactions', transactionRoutes)
appRoutes.use('/export-transactions', exportTransactions)
appRoutes.use('/bradesco-bank', bradescoBankRoutes)
appRoutes.use('/nu-bank', nuBankRoutes)
