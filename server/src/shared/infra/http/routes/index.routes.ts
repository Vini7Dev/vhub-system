import { Router } from 'express'

import { transactionRoutes } from '@modules/transactions/infra/http/routes/transaction.routes'

export const appRoutes = Router()

appRoutes.use('/transactions', transactionRoutes)
