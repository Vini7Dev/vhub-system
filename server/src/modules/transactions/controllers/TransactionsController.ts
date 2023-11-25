import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListTransactionsService } from '../services/ListTransactionsService'

export class TransactionsController {
  public async index(request: Request, response: Response) {
    const {
      originType,
      startDate,
      endDate,
    } = request.query

    const listTransactionsService = container.resolve(ListTransactionsService)

    const transactionsList = await listTransactionsService.execute({
      originType: Number(originType),
      startDate: new Date(startDate as string),
      endDate: new Date(endDate as string),
    })

    return response.json(transactionsList)
  }
}
