export type PDFPage = string[]

export interface PDFReaderProvider {
  readPDF(filePath: string): Promise<PDFPage[]>
}
