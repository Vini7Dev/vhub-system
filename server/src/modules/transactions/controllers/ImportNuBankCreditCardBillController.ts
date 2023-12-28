import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ImportNuBankCreditCardBillService } from '../services/ImportNuBankCreditCardBillService'
import { HTTP_STATUS_CODES } from '@utils/constants'

export class ImportNuBankCreditCardBillController {
  public async create(request: Request, response: Response) {
    const { file } = request
    const { statementYear } = request.body

    const importNuBankCreditCardBillService = container.resolve(ImportNuBankCreditCardBillService)

    const insertedCount = await importNuBankCreditCardBillService.execute({
      file_name: file?.filename,
      statementYear,
    })

    return response.json({ insertedCount }).status(HTTP_STATUS_CODES.created)
  }
}
