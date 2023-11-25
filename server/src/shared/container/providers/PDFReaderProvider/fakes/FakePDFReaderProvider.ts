import { PDFReaderProvider } from '../models/PDFReaderProvider'

export class FakePDFReaderProvider implements PDFReaderProvider {
  public async readPDF(filePath: string): Promise<string> {
    return `${filePath} pdf content`
  }
}
