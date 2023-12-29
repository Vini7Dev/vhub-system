import React from 'react'

import { parseDateToStringFormat } from '../../utils/dateHandlers'
import * as T from './types'
import * as S from './styles'

export const DateIntervalInput: React.FC<T.InputProps> = ({
  id,
  fromDateValue,
  toDateValue,
  onChangeFromDate,
  onChangeToDate,
}) => {
  const parseDateToDateTime = (dateString: string): Date => {
    return new Date(`${dateString}T00:00:00`)
  }

  const validateDates = (dateToSet: string, reference: 'from' | 'to') => {
    const dateToSetFormated = parseDateToDateTime(dateToSet)

    console.log('===> dateToSetFormated', dateToSetFormated)

    if (reference === 'from' && dateToSetFormated < toDateValue) {
      onChangeFromDate(dateToSetFormated)
      return
    } else if (reference === 'to' && dateToSetFormated > fromDateValue) {
      onChangeToDate(dateToSetFormated)
      return
    }

    alert('A data inicial não pode ser maior que a data final!')
  }

  return (
    <S.DateIntervalInputContainer>
      <div>
        <label htmlFor={`${id}-from`}>De</label>

        <input
          id={`${id}-from`}
          name={`${id}-from`}
          type="date"
          value={parseDateToStringFormat(fromDateValue)}
          onChange={(e) => validateDates(e.target.value, 'from')}
        />
      </div>

      <div>
        <label htmlFor={`${id}-to`}>Até</label>

        <input
          id={`${id}-to`}
          name={`${id}-to`}
          type="date"
          value={parseDateToStringFormat(toDateValue)}
          onChange={(e) => validateDates(e.target.value, 'to')}
        />
      </div>
    </S.DateIntervalInputContainer>
  )
}
