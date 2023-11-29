import React, { ChangeEvent, useCallback } from 'react'

import * as T from './types'
import * as S from './styles'

export const FileInput: React.FC<T.FileInputProps> = ({ onChange, value, ...rest}) => {
  const handleSelectFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files?.[0]) return

    onChange(event.target.files[0])
  }, [])

  return (
    <S.SelectFileButton fileSelected={!!value}>
      {value ? 'Arquivo Selecionado!' : 'Selecionar Arquivo'}

      <input {...rest} type="file" onChange={handleSelectFile} />
    </S.SelectFileButton>
  )
}
