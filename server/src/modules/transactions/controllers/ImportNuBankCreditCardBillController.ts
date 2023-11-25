import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ImportNuBankCreditCardBillService } from '../services/ImportNuBankCreditCardBillService'
import { HTTP_STATUS_CODES } from '@utils/constants'

export class ImportNuBankCreditCardBillController {
  public async create(request: Request, response: Response) {
    const { file } = request

    const importNuBankCreditCardBillService = container.resolve(ImportNuBankCreditCardBillService)

    const insertedCount = await importNuBankCreditCardBillService.execute({
      file_name: file?.filename,
    })

    return response.json({ insertedCount }).status(HTTP_STATUS_CODES.created)
  }
}
