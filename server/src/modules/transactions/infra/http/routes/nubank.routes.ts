import { Router } from 'express'

import { multerUpload } from '@configs/upload'
import { ImportNuBankCreditCardBillController } from '@modules/transactions/controllers/ImportNuBankCreditCardBillController'

const importNuBankCreditCardBillController = new ImportNuBankCreditCardBillController()

export const nuBankRoutes = Router()

nuBankRoutes.post(
  '/import-credit-card-bill',
  multerUpload.single('file'),
  importNuBankCreditCardBillController.create,
)
