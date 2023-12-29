import React, { ChangeEvent, useCallback } from 'react'

import * as T from './types'
import * as S from './styles'

export const Select: React.FC<T.SelectProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  ...rest
}) => {
  const handleSelectValue = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  }, [])

  return (
    <S.SelectContainer selected={!!value}>
      <label htmlFor={id}>{label}</label>

      <select {...rest} id={id} name={id} onChange={handleSelectValue}>
        {!value && <option value="">Selecione</option>}

        {options.map(({ value, text }, idx) => (
          <option key={idx} value={value}>{text}</option>
        ))}
      </select>
    </S.SelectContainer>
  )
}
