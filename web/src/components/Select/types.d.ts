import { SelectHTMLAttributes } from 'react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  onChange: (value: string) => void
}

export interface SelectContainerProps {
  selected: boolean
}
