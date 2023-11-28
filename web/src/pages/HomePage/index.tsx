import React from 'react'
import { PageTitle } from '../../components/PageTitle'

import * as S from './styles'

export const HomePage: React.FC = () => {
  return (
    <>
      <PageTitle title="Início" />

      <S.DashboardContainer>
        <div />
        <div />
        <div />
      </S.DashboardContainer>
    </>
  )
}
