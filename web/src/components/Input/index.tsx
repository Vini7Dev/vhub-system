import React, { ChangeEvent } from 'react'

import * as T from './types'
import * as S from './styles'

export const Input: React.FC<T.InputProps> = ({
  id,
  label,
  placeholder,
  value,
  filled,
  onChange,
  ...rest
}) => {
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <S.InputContainer filled={filled}>
      <label htmlFor={id}>{label}</label>

      <input
        {...rest}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChangeValue}
      />
    </S.InputContainer>
  )
}
