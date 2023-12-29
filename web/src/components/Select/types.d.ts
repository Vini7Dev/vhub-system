import { SelectHTMLAttributes } from 'react'

interface Option {
  value: string
  text: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  options: Option[]
  onChange: (value: string) => void
}

export interface SelectContainerProps {
  selected: boolean
}
