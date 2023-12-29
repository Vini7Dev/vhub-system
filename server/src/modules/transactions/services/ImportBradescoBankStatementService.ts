import { inject, injectable } from 'tsyringe'

import { parseMonetaryStringToIntteger } from '@utils/monetaryHandlers'
import { removeTextsFromArray } from '@utils/removeTextsFromArray'
import { brDateStringToDate } from '@utils/dateHandlers'
import { StorageProvider } from '@shared/container/providers/StorageProvider/models/StorageProvider'
import { PDFReaderProvider } from '@shared/container/providers/PDFReaderProvider/models/PDFReaderProvider'
import { TransactionsRepositoryMethods } from '../repositories/TransactionsRepositoryMethods'
import { TransactionOrigin } from '../infra/prisma/entities/Transaction'

interface ServiceProps {
  file_name?: string
}

interface TransactionProps {
  date: Date
  description: string
  value: number
  origin_type: TransactionOrigin
}

type PDFPage = string[]

const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}/

const startsWithDate = (text: string): boolean => {
  return DATE_REGEX.test(text)
}

const textIsNaN = (value: string): boolean => {
  return Number.isNaN(parseMonetaryStringToIntteger(value))
}

const removeWordsFromText = (
  text: string,
  startIndex: number,
  quantityToRemove?: number
): string => {
  const splitedText = text.split(' ')
  splitedText.splice(startIndex, quantityToRemove)
  return splitedText.join(' ')
}

const getTransactionsOnPdfContent = (pdfContentPerPage: PDFPage[]) => {
  const groupTransactionsByDate  = (lines: string[]) => {
    for (let i = 0; i < lines.length; i++) {
      i += createTransactions(lines.slice(i))
    }
  }

  const createTransactions = (lines: string[]): number => {
    const [date, ...title] = lines[0].split(' ')

    lines[0] = title.join(' ')

    const EMPTY_TRANSACTION = {
      date: brDateStringToDate(date),
      description: '',
      value: 0,
      origin_type: TransactionOrigin['Bradesco-CP/CC'],
    }

    let currentTransaction: TransactionProps = { ...EMPTY_TRANSACTION }

    for (let i = 0; i < lines.length; i++) {
      const text = lines[i]

      if (startsWithDate(text)) return i - 1

      const splitedText = text.split(' ')
      const maybeBalanceValue = splitedText[splitedText.length-1]

      let isFirstTransactionLine = textIsNaN(maybeBalanceValue)

      if (isFirstTransactionLine) {
        currentTransaction.description = `${text} - `

        isFirstTransactionLine = false
      } else {
        const transactionSubtitle = removeWordsFromText(text, -3, 3)

        const textSplitBySpaces = text.split(' ')
        const value = textSplitBySpaces[textSplitBySpaces.length-2]

        currentTransaction.description = `${currentTransaction.description}${transactionSubtitle}`
        currentTransaction.value = parseMonetaryStringToIntteger(value)

        transactions.push(currentTransaction)

        currentTransaction = { ...EMPTY_TRANSACTION }
      }
    }

    return lines.length
  }

  const pdfFullContent = pdfContentPerPage.join('\n')

  let pdfContentLines = pdfFullContent.split('\n')
  pdfContentLines = removeTextsFromArray(pdfContentLines, 'Bradesco Celular', 5)
  pdfContentLines = removeTextsFromArray(pdfContentLines, 'Total', 1)
  pdfContentLines = removeTextsFromArray(pdfContentLines, 'SALDO ANTERIOR', 1)
  pdfContentLines = removeTextsFromArray(pdfContentLines, 'INVESTIMENTOS', 1)
  pdfContentLines = pdfContentLines.filter(text => text !== '')

  pdfContentLines.slice(0, 1)
  pdfContentLines.slice(-1)

  const transactions: TransactionProps[] = []

  groupTransactionsByDate(pdfContentLines)

  return transactions
}

@injectable()
export class ImportBradescoBankStatementService {
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

    const pdfContent = await this.pdfReaderProvider.readPDF(filePath)

    await this.storageProvider.deleteFile(file_name)

    const transactions = getTransactionsOnPdfContent(pdfContent)

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
