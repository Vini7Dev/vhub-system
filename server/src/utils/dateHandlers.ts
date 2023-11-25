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
