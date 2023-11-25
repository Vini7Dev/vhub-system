import { Router } from 'express'

import { transactionRoutes } from '@modules/transactions/infra/http/routes/transaction.routes'
import { bradescoBankRoutes } from '@modules/transactions/infra/http/routes/bradescobank.routes'

export const appRoutes = Router()

appRoutes.use('/transactions', transactionRoutes)
appRoutes.use('/bradesco-bank', bradescoBankRoutes)
