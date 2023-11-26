import { Router } from 'express'

import { ImportTransactionsController } from '@modules/transactions/controllers/ImportTransactionsController'
import { multerUpload } from '@configs/upload'

const importTransactionsController = new ImportTransactionsController()

export const importTransactions = Router()

importTransactions.get(
  '/',
  multerUpload.single('file'),
  importTransactionsController.index,
)
