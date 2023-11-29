import React, { ChangeEvent, useCallback } from 'react'

import * as T from './types'
import * as S from './styles'

export const Select: React.FC<T.SelectProps> = ({ id, label, value, onChange, ...rest }) => {
  const handleSelectValue = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  }, [])

  return (
    <S.SelectContainer selected={!!value}>
      <label htmlFor={id}>{label}</label>

      <select {...rest} name={id} id={id} onChange={handleSelectValue}>
        {!value && <option value="">Selecione</option>}

        <option value="Bradesco-CP/CC">Bradesco - CP/CC</option>
        <option value="Bradesco-CDI">Bradesco - CDI</option>
        <option value="NuBank-CreditCard">Nu Bank - Cartão de Crédito</option>
      </select>
    </S.SelectContainer>
  )
}
