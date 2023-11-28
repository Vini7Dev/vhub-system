import { IconBase } from 'react-icons'

export interface ButtonProps extends ButtonProps<HTMLButtonElement> {
  color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'info'
  text: string
  Icon?: IconBase
}

export interface ButtonContainerProps {
  color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'info'
}
