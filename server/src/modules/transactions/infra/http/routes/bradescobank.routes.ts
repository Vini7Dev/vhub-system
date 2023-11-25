import { multerUpload } from '@configs/upload'
import { ImportBradescoBankStatementController } from '@modules/transactions/controllers/ImportBradescoBankStatementController'
import { Router } from 'express'

const importBradescoBankStatementController = new ImportBradescoBankStatementController()

export const bradescoBankRoutes = Router()

bradescoBankRoutes.post(
  '/import-statement',
  multerUpload.single('file'),
  importBradescoBankStatementController.create,
)
