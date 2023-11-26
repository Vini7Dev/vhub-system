import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ExportTransactionsService } from '../services/ExportTransactionsService'

export class ExportTransactionsController {
  public async index(request: Request, response: Response) {
    const {
      originType,
      startDate,
      endDate,
    } = request.query

    const exportTransactionsService = container.resolve(ExportTransactionsService)

    const exportedFilePath = await exportTransactionsService.execute({
      originType: originType === undefined ? undefined : Number(originType),
      startDate: startDate === undefined ? undefined : new Date(startDate as string),
      endDate: endDate === undefined ? undefined : new Date(endDate as string),
    })

    return response.download(exportedFilePath)
  }
}
