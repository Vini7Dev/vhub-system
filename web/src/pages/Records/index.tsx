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
import { parseDateStringToLocaleFormat, getFirstDayOfMonthInDateFormat, getLastDayOfMonthInDateFormat, parseDateToStringFormat } from '../../utils/dateHandlers'
import { formatIntegerToBRL } from '../../utils/monetaryHandlers'
import { DateIntervalInput } from '../../components/DateIntervalInput'

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
  const [originType, setOriginType] = useState<TransactionOrigin>(0)
  const [fromDate, setFromDate] = useState<Date>(getFirstDayOfMonthInDateFormat())
  const [toDate, setToDate] = useState<Date>(getLastDayOfMonthInDateFormat())

  const [transactions, setTransactions] = useState<TransactionProps[]>()
  const [loadingTransactions, setLoadingTransactions] = useState(true)

  const toggleModalIsOpen = useCallback(() => {
    setModalIsOpen(!modalIsOpen)
  }, [modalIsOpen])

  const handleGetTransactions = useCallback(async () => {
    setLoadingTransactions(true)
    const { data: transactionsData } = await apiGetTransactions({
      startDate: parseDateToStringFormat(fromDate),
      endDate: parseDateToStringFormat(toDate),
      originType,
    })

    const sortTransactions = transactionsData.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

    setTransactions(sortTransactions)
    setLoadingTransactions(false)
  }, [fromDate, toDate, originType])

  useEffect(() => {
    handleGetTransactions()
  }, [fromDate, toDate, originType])

  return (
    <>
      <PageTitle title="Registros" />

      <S.BankSelectorContainer>
        {BANK_OPTIONS.map((bank, index) => (
          <S.BankSelectorButton
            key={index}
            selected={index === originType}
            borderRadius={index === 0 ? 'left' : 'right'}
            onClick={() => setOriginType(index)}
          >
            {bank}
          </S.BankSelectorButton>
        ))}
      </S.BankSelectorContainer>

      <S.ActionsContainer>
        <DateIntervalInput
          id="date-interval-filter"
          fromDateValue={fromDate}
          toDateValue={toDate}
          onChangeFromDate={setFromDate}
          onChangeToDate={setToDate}
        />

        <Button
          color="secondary"
          size="small"
          text="IMPORTAR PDF"
          Icon={FiFile}
          onClick={toggleModalIsOpen}
        />
      </S.ActionsContainer>

      <S.RecordsTable>
        <thead>
          <tr>
            <th className="text_center tiny"></th>
            <th className="text_center small-b">DATA</th>
            <th className="text_left big">DESCRIÇÃO</th>
            <th className="text_center small">VALOR (R$)</th>
          </tr>
        </thead>

        <tbody>
          {
            loadingTransactions
              ? <tr><td colSpan={4}>Carregando...</td></tr>
              : !transactions?.length
                ? <tr><td colSpan={4}>Sem registros.</td></tr>
                : transactions?.map((transaction, idx) => {
                  const dangerOrSuccessValue = transaction.value < 0
                    ? 'danger'
                    : 'success'

                  return (
                    <tr key={idx}>
                      <td className={`text_center border_${dangerOrSuccessValue} tiny`}>
                        {`${idx + 1}°`}
                      </td>
                      <td className={`text_center border_${dangerOrSuccessValue} small-b`}>
                        {parseDateStringToLocaleFormat(transaction.date)}
                      </td>
                      <td className={`text_left border_${dangerOrSuccessValue} big`}>
                        {transaction.description}
                      </td>
                      <td className={`text_center border_${dangerOrSuccessValue} text_${dangerOrSuccessValue} small`}>
                        {formatIntegerToBRL(transaction.value)}
                      </td>
                    </tr>
                  )
                })
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
