interface HeaderProps {
  id: string
  title: string
}

interface PayloadProps {
  [key: string]: string | number | boolean | Date
}

export interface ExportDTO {
  headers: HeaderProps[]
  payloads: PayloadProps[]
}
