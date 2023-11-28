import React from 'react'

import * as T from './types'
import * as S from './styles'

export const Button: React.FC<T.ButtonProps> = ({ color, text, Icon, ...rest }) => {
  return (
    <S.ButtonContainer color={color} {...rest}>
      {Icon && <Icon size={20} />}

      {text}
    </S.ButtonContainer>
  )
}
