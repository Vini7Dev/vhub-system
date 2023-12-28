interface Options {
  url: string
  newlines?: boolean
}

type PDFPage = string[]

declare module 'pdf-data-parser' {
  export class PdfDataParser {
    constructor (options: Options)

    public parse(): Promise<PDFPage[]>
  }
}
