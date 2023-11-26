import { Request, Response } from 'express'

export class ImportTransactionsController {
  public async index(request: Request, response: Response) {
    return response.json('HELLO WORLD!')
  }
}
