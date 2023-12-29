import React from 'react'
import { Link } from 'react-router-dom'

import * as S from './styles'

export const NavigationBar: React.FC = () => {
  return (
    <S.Navigation>
      <Link to="/">
        <S.NavLink selected>Início</S.NavLink>
      </Link>

      <Link to="/records">
        <S.NavLink>Registros</S.NavLink>
      </Link>
    </S.Navigation>
  )
}
