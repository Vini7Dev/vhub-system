export const dateStringToLocaleFormat = (date: string) => {
  return new Date(date).toLocaleDateString()
}
