import { ExportProvider } from '../models/ExportProvider'
import { ExportDTO } from '../dtos/ExportDTO'

export class FakeExportProvider implements ExportProvider {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async export(_: ExportDTO): Promise<string> {
    return '/file_path'
  }
}
