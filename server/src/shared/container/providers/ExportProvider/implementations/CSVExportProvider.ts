import path from 'path'
import crypto from 'crypto'
import { createObjectCsvWriter } from 'csv-writer'

import { MULTER_TEMP_FOLDER } from '@utils/constants'
import { ExportProvider } from '../models/ExportProvider'
import { ExportDTO } from '../dtos/ExportDTO'

export class CSVExportProvider implements ExportProvider {
  public async export({
    headers,
    payloads,
  }: ExportDTO): Promise<string> {
    const fileHash = crypto.randomBytes(16).toString('hex')
    const fileName = `${fileHash}-export_transactions.csv`
    const filePath = path.resolve(MULTER_TEMP_FOLDER, fileName)

    const writer = createObjectCsvWriter({
      path: filePath,
      header: headers,
    })

    await writer.writeRecords(payloads)

    return filePath
  }
}
