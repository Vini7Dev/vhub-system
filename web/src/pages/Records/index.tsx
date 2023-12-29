import React, { useCallback, useState } from 'react'
import { FiFile, FiUpload } from 'react-icons/fi'

import { PageTitle } from '../../components/PageTitle'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import * as S from './styles'
import { FileInput } from '../../components/FileInput'
import { Select } from '../../components/Select'
import { Input } from '../../components/Input'

const BANK_OPTIONS = ['BRADESCO', 'NU BANK']

const ModalContent: React.FC = () => {
  const [pdfFormat, setPdfFormat] = useState<string>()
  const [pdfToUpdate, setPdfToUpdate] = useState<File>()
  const [pdfYear, setPdfYear] = useState<string>('')

  const updatePdfFormat = useCallback((pdfFormatToSet: string) => {
    setPdfFormat(pdfFormatToSet)
  }, [])

  const updatePdfFile = useCallback((pdfFileToSet: File) => {
    setPdfToUpdate(pdfFileToSet)
  }, [])

  const updatePdfYear = useCallback((pdfYearToSet: string) => {
    setPdfYear(pdfYearToSet)
  }, [])

  return (
    <>
      <Select
        id="pdf-format"
        label="Tipo do PDF*"
        options={[
          { value: 'Bradesco-CP/CC', text: 'Bradesco - CP/CC' },
          // { value: 'Bradesco-CDI', text: 'Bradesco - CDI' },
          { value: 'NuBank-CreditCard', text: 'Nu Bank - Cartão de Crédito' },
        ]}
        value={pdfFormat}
        onChange={updatePdfFormat}
      />

      {
        pdfFormat === 'NuBank-CreditCard' && (
          <Input
            id="statement-year"
            label="Ano da fatura*"
            value={pdfYear}
            placeholder={`${new Date().getFullYear()}`}
            filled={pdfYear.length > 0}
            type="number"
            min={1000}
            onChange={updatePdfYear}
          />
        )
      }

      <FileInput
        value={pdfToUpdate?.name}
        onChange={updatePdfFile}
      />

      <Button color="tertiary" text="ENVIAR" Icon={FiUpload} />
    </>
  )
}

export const Records: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedBankIndex, setSelectedBankIndex] = useState(0)

  const toggleModalIsOpen = useCallback(() => {
    setModalIsOpen(!modalIsOpen)
  }, [modalIsOpen])

  const handleChangeSelectedBank = useCallback((index: number) => {
    setSelectedBankIndex(index)
  }, [])

  return (
    <>
      <PageTitle title="Registros" />

      <S.BankSelectorContainer>
        {BANK_OPTIONS.map((bank, index) => (
          <S.BankSelectorButton
            key={index}
            selected={index === selectedBankIndex}
            borderRadius={index === 0 ? 'left' : 'right'}
            onClick={() => handleChangeSelectedBank(index)}
          >
            {bank}
          </S.BankSelectorButton>
        ))}
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
