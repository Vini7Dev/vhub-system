import { Router } from 'express'

import { TransactionsController } from '@modules/transactions/controllers/TransactionsController'

const transactionsController = new TransactionsController()

export const transactionRoutes = Router()

transactionRoutes.get('/', transactionsController.index)
