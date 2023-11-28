import React from 'react'

import * as S from './styles'

export const NavigationBar: React.FC = () => {
  return (
    <S.Navigation>
      <S.NavLink href="/" selected>Início</S.NavLink>

      <S.NavLink href="/transactions">Transações</S.NavLink>
    </S.Navigation>
  )
}
