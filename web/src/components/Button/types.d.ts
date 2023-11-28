import { ButtonHTMLAttributes } from 'react'
import { IconBase } from 'react-icons'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'info'
  size?: 'normal' | 'small'
  Icon?: IconBase
  text: string
}

export interface ButtonContainerProps {
  color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'info'
  size: 'normal' | 'small'
}
