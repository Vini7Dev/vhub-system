import { Router } from 'express'

import { exportTransactions } from './exportTransactions.routes'
import { importTransactions } from './importTransactions.routes'
import { TransactionsController } from '@modules/transactions/controllers/TransactionsController'

const transactionsController = new TransactionsController()

export const transactionRoutes = Router()

transactionRoutes.use('/export', exportTransactions)
transactionRoutes.use('/import', importTransactions)

transactionRoutes.get('/', transactionsController.index)
