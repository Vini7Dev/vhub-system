import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { HTTP_STATUS_CODES } from '@utils/constants'
import { ImportBradescoBankStatementService } from '../services/ImportBradescoBankStatementService'

export class ImportBradescoBankStatementController {
  public async create(request: Request, response: Response) {
    const { file } = request

    const importBradescoBankStatementService = container.resolve(ImportBradescoBankStatementService)

    const insertedCount = await importBradescoBankStatementService.execute({
      file_name: file?.filename,
    })

    return response.json({ insertedCount }).status(HTTP_STATUS_CODES.created)
  }
}
