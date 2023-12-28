export const parseMonetaryStringToIntteger = (text: string): number => {
  return Number(text.replace(/\./g, '').replace(/,/g, ''))
}
