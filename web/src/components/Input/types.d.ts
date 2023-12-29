import { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  placeholder: string
  filled?: boolean
  onChange(value: string | number): void
}

export interface InputContainerProps {
  filled?: boolean
}
