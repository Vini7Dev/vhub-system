import { InputHTMLAttributes } from 'react'

export interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (file: File) => void
}

export interface SelectFileButtonProps {
  fileSelected?: boolean
}
