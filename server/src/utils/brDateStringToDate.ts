export const brDateStringToDate = (dateString: string) => {
  return new Date(dateString.split('/').reverse().join('/'))
}
