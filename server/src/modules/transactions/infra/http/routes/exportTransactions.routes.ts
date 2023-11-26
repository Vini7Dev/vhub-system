import { ExportTransactionsController } from '@modules/transactions/controllers/ExportTransactionsController'
import { Router } from 'express'

const exportTransactionsController = new ExportTransactionsController()

export const exportTransactions = Router()

exportTransactions.get('/', exportTransactionsController.index)
