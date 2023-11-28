import React from 'react'
import { FiUpload } from 'react-icons/fi'

import { PageTitle } from '../../components/PageTitle'
import { Button } from '../../components/Button'
import * as S from './styles'

export const Records: React.FC = () => {
  return (
    <>
      <PageTitle title="Registros" />

      <S.BankSelectorContainer>
        <S.BankSelectorButton selected>BRADESCO</S.BankSelectorButton>
        <S.BankSelectorButton>NU BANK</S.BankSelectorButton>
      </S.BankSelectorContainer>

      <Button color="secondary" text="IMPORTAR" Icon={FiUpload} />

      <S.RecordsTable>
        <thead>
          <tr>
            <th className="text_center">Data</th>
            <th className="text_left">Descrição</th>
            <th className="text_right">Valor (R$)</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="text_center border_success">24/11/2023</td>
            <td className="text_left border_success">Renda XYZ</td>
            <td className="text_right border_success text_success">R$ 1000,00</td>
          </tr>

          <tr>
            <td className="text_center border_danger">09/11/2023</td>
            <td className="text_left border_danger">Panificadora...</td>
            <td className="text_right border_danger text_danger">R$ -500,00</td>
          </tr>
        </tbody>
      </S.RecordsTable>
    </>
  )
}
