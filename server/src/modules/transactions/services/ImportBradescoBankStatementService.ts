import { inject, injectable } from 'tsyringe'

import { brDateStringToDate } from '@utils/brDateStringToDate'
import { keepOnlyPriceNumbers } from '@utils/keepOnlyPriceNumbers'
import { StorageProvider } from '@shared/container/providers/StorageProvider/models/StorageProvider'
import { PDFReaderProvider } from '@shared/container/providers/PDFReaderProvider/models/PDFReaderProvider'
import { TransactionsRepositoryMethods } from '../repositories/TransactionsRepositoryMethods'
import { TransactionOrigin } from '../infra/prisma/entities/Transaction'

interface ServiceProps {
  file_name?: string
}

interface TransactionDateGroups {
  [date: string]: string[]
}

interface TransactionProps {
  date: string
  description: string
  value: number
}

const groupTransactionsByDate = (transactionRows: string[]) => {
  const INVESTIMENTS_ROW_REGEXP = /^(RESGATE DE INVESTIMENTOS|APLICACAO INVESTIMENTO)/

  const transactionDateGroups: TransactionDateGroups = {}
  let currentDateGroup: string | null = null

  for (const transactionRow of transactionRows) {
    const [firstTransactionRowTerm, ...otherTransactionRowTerms] = transactionRow.split(' ')

    const isDate = /^\d{2}\/\d{2}\/\d{4}$/.test(firstTransactionRowTerm)

    if (isDate) {
      currentDateGroup = firstTransactionRowTerm
      const otherTransactionRowTerm = otherTransactionRowTerms.join(' ')

      if (INVESTIMENTS_ROW_REGEXP.test(otherTransactionRowTerm)) {
        transactionDateGroups[currentDateGroup] = [
          ...transactionDateGroups[currentDateGroup] ?? [],
          otherTransactionRowTerm,
        ]
      } else {
        transactionDateGroups[currentDateGroup] = [
          ...transactionDateGroups[currentDateGroup] ?? [],
        ]
      }
    } else if (currentDateGroup) {
      transactionDateGroups[currentDateGroup].push(transactionRow)
    }
  }

  return transactionDateGroups
}

const getTransactionRowsByPdfContent = (content: string) => {
  const MULTIPLE_BREAK_LINES = /\n\n\n/gi
  const UNUSED_ROW_TERMS = [
    { term: 'Bradesco Celular', index: 0 },
    { term: 'Data: ', index: 0 },
    { term: 'Nome: ', index: 0 },
    { term: 'Extrato de: ', index: 0 },
    { term: 'Data Histórico Docto.', index: 0 },
    { term: ' SALDO ANTERIOR ', index: 10 },
    { term: 'Total ', index: 0 },
    { term: 'Extrato Inexistente.', index: 0 },
    { term: 'APLICACAO INVESTIMENTOS', index: 0 }
  ]

  const contentWithoutMultipleBreakLines = content.replace(MULTIPLE_BREAK_LINES, '')

  const contentRows = contentWithoutMultipleBreakLines.split('\n')

  const filteredContentRows = contentRows.filter(row => (
    row !== ''
    && !UNUSED_ROW_TERMS.find(({ term, index }) => row.indexOf(term) === index)
  ))

  return filteredContentRows
}

const buildTransactionEntityByTransactionDateGroups = (
  transactionDateGrups: TransactionDateGroups
) => {
  const INVESTIMENTS_ROW_REGEXP = /^(RESGATE DE INVESTIMENTOS|APLICACAO INVESTIMENTO)/

  const transactionEntities: TransactionProps[] = []

  for (const date of Object.keys(transactionDateGrups)) {
    const transactionRows = transactionDateGrups[date]

    const investimentRows = transactionRows.filter(
      row => INVESTIMENTS_ROW_REGEXP.test(row)
    )

    for (const investimentRow of investimentRows) {
      const transactionRowSplit = investimentRow.split(' ')
      const [, valueString] = transactionRowSplit.reverse()

      const description = transactionRowSplit.reverse().slice(0, 4).join(' ')
      const value = Number(keepOnlyPriceNumbers(valueString))

      transactionEntities.push({
        date,
        description,
        value
      })
    }

    const commonTransactionRows = transactionRows.filter(
      row => !INVESTIMENTS_ROW_REGEXP.test(row)
    )

    for (let i = 0; i < commonTransactionRows.length; i += 3) {
      const description = `${commonTransactionRows[i]} ${commonTransactionRows[i+1]}`

      const [, debitValue, creditString] = commonTransactionRows[i+2].split(' ')

      const value = Number(keepOnlyPriceNumbers(debitValue || creditString))

      transactionEntities.push({
        date,
        description,
        value,
      })
    }
  }

  return transactionEntities
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

    const content = await this.pdfReaderProvider.readPDF(filePath)

    const transactionRows = getTransactionRowsByPdfContent(content)

    const transactionByDateGrops = groupTransactionsByDate(transactionRows)

    const transactions = buildTransactionEntityByTransactionDateGroups(transactionByDateGrops)

    await this.storageProvider.deleteFile(file_name)

    let totalOfTransactions = 0

    for (const transaction of transactions) {
      const transactionData = {
        date: brDateStringToDate(transaction.date),
        description: transaction.description,
        value: transaction.value,
        origin_type: TransactionOrigin['Bradesco-CP/CC']
      }

      const equalTransaction = await this.transactionsRepository.findEqualTransaction(transactionData)

      if (equalTransaction) continue

      await this.transactionsRepository.create(transactionData)

      totalOfTransactions += 1
    }

    return totalOfTransactions
  }
}
