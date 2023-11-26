import { ExportDTO } from '../dtos/ExportDTO'

export interface ExportProvider {
  export(content: ExportDTO): Promise<string>
}
