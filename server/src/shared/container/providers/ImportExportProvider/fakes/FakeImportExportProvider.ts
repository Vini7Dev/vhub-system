import { ImportExportProvider } from '../models/ImportExportProvider'
import { ExportDTO } from '../dtos/ExportDTO'

export class FakeImportExportProvider implements ImportExportProvider {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async export(_: ExportDTO): Promise<string> {
    return '/file_path'
  }
}
