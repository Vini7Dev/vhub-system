import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetTransactionsDashboardService } from '../services/GetTransactionsDashboardService'

export class GetTransactionsDashboardController {
  public async index(request: Request, response: Response) {
    const {
      numberOfMonths,
    } = request.query

    const getTransactionsDashboardService = container.resolve(GetTransactionsDashboardService)

    const dashboardData = await getTransactionsDashboardService.execute({
      numberOfMonths: numberOfMonths === undefined ? undefined : Number(numberOfMonths)
    })

    return response.json(dashboardData)
  }
}
