import { inject, injectable } from 'tsyringe'

import { TransactionsRepositoryMethods } from '../repositories/TransactionsRepositoryMethods'
import { StorageProvider } from '@shared/container/providers/StorageProvider/models/StorageProvider'
import { PDFReaderProvider } from '@shared/container/providers/PDFReaderProvider/models/PDFReaderProvider'
import { TransactionOrigin } from '../infra/prisma/entities/Transaction'
import { convertBrMonthToMonthNumber } from '@utils/dateHandlers'
import { keepOnlyPriceNumbers } from '@utils/keepOnlyPriceNumbers'

interface ServiceProps {
  file_name?: string
}

interface BuildTransactionEntityByRowProps {
  transactionRow: string
  statementYear: number
}

interface TransactionProps {
  description: string
  value: number
  date: Date
  origin: TransactionOrigin
}

const getStatementYear = (content: string) => {
  const contentPerRow = content.split('\n')

  const STATEMENT_DATE_LINE_TERM = 'FATURA'

  const statementYearRow = contentPerRow.find(
    row => row.indexOf(STATEMENT_DATE_LINE_TERM) === 0
  )

  if (!statementYearRow) {
    return new Date().getFullYear()
  }

  const [,,,statementYear] = statementYearRow.split(' ')

  return Number(statementYear)
}

const startsWithTransactionDate = (transactionRow: string) => {
  const TRANSACTION_DATE_REGEXP = /^(0[1-9]|[12]\d|3[01]) (JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)$/

  return TRANSACTION_DATE_REGEXP.test(transactionRow.slice(0, 6))
}

const getTransactionRowsByPdfContent = (content: string) => {
  const PAGE_DIVISION = '\n\n\n'
  const UNUSED_BREAK_LINES = / \n \n /g
  const TRANSACTIONS_START_PAGE_CONTENT = 'TRANSAÇÕES'
  const PAYMENT_IN_ROW = ' Pagamento em'

  const contentPerPage = content.split(PAGE_DIVISION).map(
    page => page.replace(UNUSED_BREAK_LINES, '')
  )

  const transactionPages = contentPerPage.filter(
    pageContent => pageContent.indexOf(TRANSACTIONS_START_PAGE_CONTENT) === 1
  )

  const transactionRows = transactionPages.map(transactionPage => {
    const transactionPageTransactionRows = transactionPage.split('\n')

    return transactionPageTransactionRows
      .filter(row =>
        row !== ''
        && row.indexOf(TRANSACTIONS_START_PAGE_CONTENT) !== 1
        && row.indexOf(PAYMENT_IN_ROW) === -1
        && startsWithTransactionDate(row)
      )
      .map(row => row.replace(' ', '-'))
  }).flat()

  return transactionRows
}

const buildTransactionEntityByRow = ({
  transactionRow,
  statementYear,
}: BuildTransactionEntityByRowProps): TransactionProps => {
  const SPACE_BETWEEN_TRANSACTION_SECTIONS = ' '
  const FIRST_ITEM_INDEX = 0
  const REMOVE_ONE_ITEM = 1
  const NEGATIVE_VALUE = -1

  const transactionSpaceSplit = transactionRow.split(SPACE_BETWEEN_TRANSACTION_SECTIONS)
  const [transactionDate] = transactionSpaceSplit.splice(FIRST_ITEM_INDEX, REMOVE_ONE_ITEM)
  const [transactionValue] = transactionSpaceSplit.splice(transactionSpaceSplit.length-1, REMOVE_ONE_ITEM)
  const [transactionDay, transactionBrMonth] = transactionDate.split('-')
  const transactionMonth = convertBrMonthToMonthNumber(transactionBrMonth)

  const date = new Date(`${statementYear}/${transactionMonth}/${transactionDay}`)
  const description = transactionSpaceSplit.join(' ')
  const value = NEGATIVE_VALUE * Number(keepOnlyPriceNumbers(transactionValue))

  const transactionData = {
    description,
    value,
    date,
    origin: TransactionOrigin['NuBank-CreditCard']
  }

  return transactionData
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

  public async execute({ file_name }: ServiceProps) {
    if (!file_name) return 0

    const filePath = await this.storageProvider.saveFile(file_name)

    const content = await this.pdfReaderProvider.readPDF(filePath)

    await this.storageProvider.deleteFile(file_name)

    const statementYear = getStatementYear(content)

    const transactionRows = getTransactionRowsByPdfContent(content)

    const transactions = transactionRows.map(transactionRow =>
      buildTransactionEntityByRow({
        transactionRow,
        statementYear,
      })
    )

    let totalOfTransactions = 0

    for (const transaction of transactions) {
      const transactionData = {
        date: transaction.date,
        description: transaction.description,
        value: transaction.value,
        origin_type: TransactionOrigin['NuBank-CreditCard']
      }

      const equalTransaction = await this.transactionsRepository.findEqualTransaction(transactionData)

      if (equalTransaction) continue

      await this.transactionsRepository.create(transactionData)

      totalOfTransactions += 1
    }

    return totalOfTransactions
  }
}
