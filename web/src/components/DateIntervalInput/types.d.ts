export interface InputProps {
  id: string
  fromDateValue: Date
  toDateValue: Date
  onChangeFromDate(newDate: Date): void
  onChangeToDate(newDate: Date): void
}
