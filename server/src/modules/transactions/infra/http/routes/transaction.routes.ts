import { Router } from 'express'

import { TransactionsController } from '@modules/transactions/controllers/TransactionsController'
import { ExportTransactionsController } from '@modules/transactions/controllers/ExportTransactionsController'
import { GetTransactionsDashboardController } from '@modules/transactions/controllers/GetTransactionsDashboardController'

const transactionsController = new TransactionsController()

const exportTransactionsController = new ExportTransactionsController()

const getTransactionsDashboardController = new GetTransactionsDashboardController()

export const transactionRoutes = Router()

transactionRoutes.get('/', transactionsController.index)

transactionRoutes.get('/export', exportTransactionsController.index)

transactionRoutes.get('/dashboard', getTransactionsDashboardController.index)
