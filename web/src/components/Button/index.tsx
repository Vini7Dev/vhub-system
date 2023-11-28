import React from 'react'

import * as T from './types'
import * as S from './styles'

export const Button: React.FC<T.ButtonProps> = ({
  color = 'primary',
  size = 'normal',
  text,
  Icon,
  ...rest
}) => {
  return (
    <S.ButtonContainer {...rest} color={color} size={size}>
      {Icon && <Icon size={20} />}

      {text}
    </S.ButtonContainer>
  )
}
