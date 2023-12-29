export const parseDateStringToLocaleFormat = (date: string): string => {
  return new Date(date).toLocaleDateString()
}

export const parseDateToStringFormat = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

export const getFirstDayOfMonthInDateFormat = (date = new Date()): Date => {
  const dateFullYear = date.getFullYear()
  const dateMonth = date.getMonth()

  return new Date(dateFullYear, dateMonth, 1)
}

export const getLastDayOfMonthInDateFormat = (date = new Date()): Date => {
  const dateFullYear = date.getFullYear()
  const dateMonth = date.getMonth()

  return new Date(dateFullYear, dateMonth + 1, 0)
}
