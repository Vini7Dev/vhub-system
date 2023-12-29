import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import * as S from './styles'

const NAVIGATION_LINKS = [
  { path: '/', pageName: 'Início' },
  { path: '/records', pageName: 'Registros' },
]

export const NavigationBar: React.FC = () => {
  const location = useLocation()

  return (
    <S.Navigation>
      {
        NAVIGATION_LINKS.map(({ path, pageName }, idx) => (
          <Link key={idx} to={path}>
            <S.NavLink selected={location.pathname === path}>{pageName}</S.NavLink>
          </Link>
        ))
      }
    </S.Navigation>
  )
}
