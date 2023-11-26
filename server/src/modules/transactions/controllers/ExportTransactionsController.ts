import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ExportTransactionsService } from '../services/ExportTransactionsService'
import { isUndefined } from '@utils/isUndefined'

export class ExportTransactionsController {
  public async index(request: Request, response: Response) {
    const {
      originType,
      startDate,
      endDate,
    } = request.query

    const exportTransactionsService = container.resolve(ExportTransactionsService)

    const exportedFilePath = await exportTransactionsService.execute({
      originType: isUndefined(originType) ? undefined : Number(originType),
      startDate: isUndefined(startDate) ? undefined : new Date(startDate as string),
      endDate: isUndefined(endDate) ? undefined : new Date(endDate as string),
    })

    return response.download(exportedFilePath)
  }
}
