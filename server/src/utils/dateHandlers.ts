export const brDateStringToDate = (dateString: string) => {
  return new Date(dateString.split('/').reverse().join('/'))
}

const getEnMonthByBrMonth = (brMonth: string) => {
  switch (brMonth) {
  case 'FEV': return 'FEB'
  case 'ABR': return 'APR'
  case 'MAI': return 'MAY'
  case 'AGO': return 'AUG'
  case 'SET': return 'SEP'
  case 'OUT': return 'OCT'
  case 'DEZ': return 'DEC'
  default: return brMonth
  }
}

export const convertBrMonthToMonthNumber = (brMonth: string) => {
  const enMonth = getEnMonthByBrMonth(brMonth)

  const monthNumber = new Date(`1900/${enMonth}`).getMonth() + 1

  return String(monthNumber).padStart(2, '0')
}

export const getMonthGroup = (date: Date) => {
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
}

export const removeMonthsOfDate = (date: Date, numberOfMonths: number) => {
  return new Date(date.setMonth(date.getMonth() - numberOfMonths + 1))
}

export const setDateToFistDayOfMonth = (date: Date) => {
  date.setDate(1)
  date.setHours(0)
  date.setMinutes(0)
  date.setMilliseconds(0)

  return date
}
