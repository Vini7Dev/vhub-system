import React from 'react'

import * as T from './types'
import * as S from './styles'

export const PageTitle: React.FC<T.PageTitleProps> = ({ title }) => {
  return <S.Title>{title}</S.Title>
}
