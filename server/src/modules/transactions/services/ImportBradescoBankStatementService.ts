import { inject, injectable } from 'tsyringe'

import { StorageProvider } from '@shared/container/providers/StorageProvider/models/StorageProvider'
import { PDFReaderProvider } from '@shared/container/providers/PDFReaderProvider/models/PDFReaderProvider'
import { keepOnlyPriceNumbers } from '@utils/keepOnlyPriceNumbers'

interface ServiceProps {
  file_name?: string
}

interface TransactionDateGroups {
  [date: string]: string[]
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

  const IGNORE_PAYMENT_OF_CREDIT_CART_REGEXP = /.*\sNU$/

  const transactionEntities: unknown[] = []
  const created_at = new Date()

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
        value,
        created_at
      })
    }

    const commonTransactionRows = transactionRows.filter(
      row => !INVESTIMENTS_ROW_REGEXP.test(row)
    )

    for (let i = 0; i < commonTransactionRows.length; i += 3) {
      if (IGNORE_PAYMENT_OF_CREDIT_CART_REGEXP.test(commonTransactionRows[i+1])) {
        continue
      }

      const description = `${commonTransactionRows[i]} ${commonTransactionRows[i+1]}`

      const [, debitValue, creditString] = commonTransactionRows[i+2].split(' ')

      const value = Number(keepOnlyPriceNumbers(debitValue || creditString))

      transactionEntities.push({
        date,
        description,
        value,
        created_at
      })
    }
  }

  return transactionEntities
}

@injectable()
export class ImportBradescoBankStatementService {
  constructor (
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

    const transactionEntities = buildTransactionEntityByTransactionDateGroups(transactionByDateGrops)

    await this.storageProvider.deleteFile(file_name)

    return transactionEntities.length
  }
}
