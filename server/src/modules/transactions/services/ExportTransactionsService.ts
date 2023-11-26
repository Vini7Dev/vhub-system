import { inject, injectable } from 'tsyringe'

import { ExportProvider } from '@shared/container/providers/ExportProvider/models/ExportProvider'
import { TransactionsRepositoryMethods } from '../repositories/TransactionsRepositoryMethods'
import { TransactionOrigin } from '../infra/prisma/entities/Transaction'

interface ServiceProps {
  originType?: TransactionOrigin
  startDate?: Date
  endDate?: Date
}

const CSV_FILE_HEADERS = [
  { id: 'id', title: 'Identificador' },
  { id: 'date', title: 'Data' },
  { id: 'description', title: 'Descrição' },
  { id: 'value', title: 'Valor R$' },
  { id: 'origin_type', title: 'Origem da Movimentação' },
  { id: 'created_at', title: 'Criado em' },
]

@injectable()
export class ExportTransactionsService {
  constructor (
    @inject('TransactionsRepository')
    private transactionsRepository: TransactionsRepositoryMethods,

    @inject('ExportProvider')
    private exportProvider: ExportProvider,
  ) {}

  public async execute({
    originType,
    startDate,
    endDate,
  }: ServiceProps): Promise<string> {
    if (startDate && endDate && startDate > endDate) {
      throw new Error('The start date must be less than the end date!')
    }

    const transactionsList = await this.transactionsRepository.list({
      originType,
      startDate,
      endDate,
    })

    const csvFilePath = await this.exportProvider.export({
      headers: CSV_FILE_HEADERS,
      payloads: transactionsList,
    })

    return csvFilePath
  }
}
