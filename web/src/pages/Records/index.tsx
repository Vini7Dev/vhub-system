import React, { useCallback, useState } from 'react'
import { FiFile, FiUpload } from 'react-icons/fi'

import { PageTitle } from '../../components/PageTitle'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import * as S from './styles'
import { FileInput } from '../../components/FileInput'

const ModalContent: React.FC = () => {
  return (
    <>
      <FileInput />

      <Button color="tertiary" text="ENVIAR" Icon={FiUpload} />
    </>
  )
}

export const Records: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const toggleModalIsOpen = useCallback(() => {
    setModalIsOpen(!modalIsOpen)
  }, [modalIsOpen])

  return (
    <>
      <PageTitle title="Registros" />

      <S.BankSelectorContainer>
        <S.BankSelectorButton selected>BRADESCO</S.BankSelectorButton>
        <S.BankSelectorButton>NU BANK</S.BankSelectorButton>
      </S.BankSelectorContainer>

      <Button
        color="secondary"
        size="small"
        text="IMPORTAR PDF"
        Icon={FiFile}
        onClick={toggleModalIsOpen}
      />

      <S.RecordsTable>
        <thead>
          <tr>
            <th className="text_center small">Data</th>
            <th className="text_left big">Descrição</th>
            <th className="text_center small">Valor (R$)</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="text_center border_success small">24/11/2023</td>
            <td className="text_left border_success big">Renda XYZ</td>
            <td className="text_center border_success text_success small">R$ 1000,00</td>
          </tr>

          <tr>
            <td className="text_center border_danger small">09/11/2023</td>
            <td className="text_left border_danger big">Panificadora...</td>
            <td className="text_center border_danger text_danger small">R$ -19,99</td>
          </tr>

          <tr>
            <td className="text_center border_danger small">09/11/2023</td>
            <td className="text_left border_danger big">Mercado Livre - Guarda Roupas 3/4</td>
            <td className="text_center border_danger text_danger small">R$ -500,00</td>
          </tr>
        </tbody>
      </S.RecordsTable>

      {
        modalIsOpen && (
          <Modal
            title="Importar PDF"
            close={toggleModalIsOpen}
            Content={ModalContent}
          />
        )
      }

    </>
  )
}
