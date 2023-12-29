import { inject, injectable } from 'tsyringe'

import { StorageProvider } from '@shared/container/providers/StorageProvider/models/StorageProvider'
import { PDFReaderProvider } from '@shared/container/providers/PDFReaderProvider/models/PDFReaderProvider'
import { convertBrMonthToMonthNumber } from '@utils/dateHandlers'
import { parseMonetaryStringToIntteger } from '@utils/monetaryHandlers'
import { TransactionsRepositoryMethods } from '../repositories/TransactionsRepositoryMethods'
import { TransactionOrigin } from '../infra/prisma/entities/Transaction'
import { removeTextsFromArray } from '@utils/removeTextsFromArray'

interface ServiceProps {
  statementYear: string
  file_name?: string
}

interface BuildTransactionEntityByRowProps {
  transactionRow: string
  statementYear: string
}

interface TransactionProps {
  description: string
  value: number
  date: Date
  origin_type: TransactionOrigin
}

type PDFPage = string[]

const getTransactionRowsOnPdfContent = (pdfContentPerPage: PDFPage[]) => {
  pdfContentPerPage.splice(0, 3)
  pdfContentPerPage.splice(-1)

  let onlyTransactions = pdfContentPerPage.map(pageContent => {
    const pageRows = pageContent[0].split('\n')

    pageRows.splice(0, 1)
    pageRows.splice(-3)

    return pageRows
  }).flat()

  onlyTransactions = removeTextsFromArray(onlyTransactions, 'Pagamento em', 1)

  return onlyTransactions
}

const buildTransactionEntityByRow = ({
  transactionRow,
  statementYear,
}: BuildTransactionEntityByRowProps): TransactionProps => {
  const transactionsSplit = transactionRow.split(' ')

  const [day, brMonth] = transactionsSplit.splice(0, 2)
  const [value] = transactionsSplit.splice(-1)
  const description = transactionsSplit.join(' ')

  const month = convertBrMonthToMonthNumber(brMonth)

  const date = new Date(`${statementYear}/${month}/${day}`)

  const inputOrOutputValue = description.indexOf('Extorno de') === -1
    ? `-${value}`
    : value

  return {
    date,
    description,
    value: parseMonetaryStringToIntteger(inputOrOutputValue),
    origin_type: TransactionOrigin['NuBank-CreditCard'],
  }
}

@injectable()
export class ImportNuBankCreditCardBillService {
  constructor (
    @inject('TransactionsRepository')
    private transactionsRepository: TransactionsRepositoryMethods,

    @inject('StorageProvider')
    private storageProvider: StorageProvider,

    @inject('PDFReaderProvider')
    private pdfReaderProvider: PDFReaderProvider,
  ) {}

  public async execute({ file_name, statementYear }: ServiceProps) {
    if (!file_name) return 0

    const filePath = await this.storageProvider.saveFile(file_name)

    const pdfContent = await this.pdfReaderProvider.readPDF(filePath)

    await this.storageProvider.deleteFile(file_name)

    const transactionRows = getTransactionRowsOnPdfContent(pdfContent)

    const transactions = transactionRows.map(transactionRow =>
      buildTransactionEntityByRow({
        transactionRow,
        statementYear,
      })
    )

    const nonRepetitiveTransactionsMap = await Promise.all(
      transactions.map(async transaction => {
        return this.transactionsRepository.findEqualTransaction(transaction)
      })
    )

    const nonRepetitiveTransactions = transactions.filter((_, idx) => {
      return !nonRepetitiveTransactionsMap[idx]
    })

    for (const transaction of nonRepetitiveTransactions) {
      await this.transactionsRepository.create(transaction)
    }

    return nonRepetitiveTransactions.length
  }
}
