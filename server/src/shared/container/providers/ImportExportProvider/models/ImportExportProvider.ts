import { ExportDTO } from '../dtos/ExportDTO'

export interface ImportExportProvider {
  export(content: ExportDTO): Promise<string>
}
