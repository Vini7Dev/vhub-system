export interface PDFReaderProvider {
  readPDF(filePath: string): Promise<string>
}
