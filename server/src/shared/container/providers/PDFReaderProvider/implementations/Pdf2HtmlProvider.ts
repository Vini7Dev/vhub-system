import { PdfDataParser } from 'pdf-data-parser'

import { PDFPage, PDFReaderProvider } from '../models/PDFReaderProvider'

export class Pdf2HtmlProvider implements PDFReaderProvider {
  public async readPDF(filePath: string): Promise<PDFPage[]> {
    const parser = new PdfDataParser({
      url: filePath,
      newlines: true,
    })

    const content = await parser.parse()

    return content
  }
}
