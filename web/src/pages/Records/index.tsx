import React, { useCallback, useEffect, useState } from 'react'
import { FiFile, FiUpload } from 'react-icons/fi'

import { PageTitle } from '../../components/PageTitle'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import * as S from './styles'
import { FileInput } from '../../components/FileInput'
import { Select } from '../../components/Select'
import { Input } from '../../components/Input'
import { TransactionOrigin, TransactionProps, apiGetTransactions } from '../../services/api'
import { dateStringToLocaleFormat } from '../../utils/dateHandlers'
import { formatIntegerToBRL } from '../../utils/monetaryHandlers'

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
  const [transactions, setTransactions] = useState<TransactionProps[]>()
  const [originType, setOriginType] = useState<TransactionOrigin>(0)

  const toggleModalIsOpen = useCallback(() => {
    setModalIsOpen(!modalIsOpen)
  }, [modalIsOpen])

  const handleChangeSelectedBank = useCallback((index: number) => {
    setOriginType(index)
  }, [])

  const handleGetTransactions = useCallback(async () => {
    const { data: transactionsData } = await apiGetTransactions({
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      originType,
    })

    const sortTransactions = transactionsData.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

    setTransactions(sortTransactions)
  }, [originType])

  useEffect(() => {
    handleGetTransactions()
  }, [originType])

  return (
    <>
      <PageTitle title="Registros" />

      <S.BankSelectorContainer>
        {BANK_OPTIONS.map((bank, index) => (
          <S.BankSelectorButton
            key={index}
            selected={index === originType}
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
            <th className="text_center small">DATA</th>
            <th className="text_left big">DESCRIÇÃO</th>
            <th className="text_center small">VALOR (R$)</th>
          </tr>
        </thead>

        <tbody>
          {
            !transactions
              ? 'Carregando...'
              : transactions?.map((transaction, idx) => (
                <tr key={idx}>
                  <td className={`text_center border_${transaction.value < 0 ? 'danger' : 'success'} small`}>
                    {dateStringToLocaleFormat(transaction.date)}
                  </td>
                  <td className={`text_left border_${transaction.value < 0 ? 'danger' : 'success'} big`}>
                    {transaction.description}
                  </td>
                  <td className={`text_center border_${transaction.value < 0 ? 'danger' : 'success'} text_${transaction.value < 0 ? 'danger' : 'success'} small`}>
                    {formatIntegerToBRL(transaction.value)}
                  </td>
                </tr>
              ))
          }
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
