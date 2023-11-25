import pdf2html from 'pdf2html'

import { PDFReaderProvider } from '../models/PDFReaderProvider'

export class Pdf2HtmlProvider implements PDFReaderProvider {
  public async readPDF(filePath: string): Promise<string> {
    const content = await pdf2html.text(filePath)

    return content
  }
}
