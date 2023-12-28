import { PDFPage, PDFReaderProvider } from '../models/PDFReaderProvider'

export class FakePDFReaderProvider implements PDFReaderProvider {
  public async readPDF(filePath: string): Promise<PDFPage[]> {
    return [[`${filePath} pdf content`]]
  }
}
