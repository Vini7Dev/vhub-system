declare module 'pdf2html' {
  export const text = (filePath: string) => {
    return filePath as Promise<string>
  }
}
