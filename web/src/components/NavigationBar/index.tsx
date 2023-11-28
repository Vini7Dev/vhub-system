import React from 'react'

import * as S from './styles'

export const NavigationBar: React.FC = () => {
  return (
    <S.Navigation>
      <S.NavLink href="/" selected>Início</S.NavLink>

      <S.NavLink href="/records">Registros</S.NavLink>
    </S.Navigation>
  )
}
