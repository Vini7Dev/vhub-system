import React, { ChangeEvent, useCallback, useState } from 'react'

import * as S from './styles'

export const FileInput: React.FC = () => {
  const [file, setFile] = useState<File>()

  const handleSelectFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files?.[0]) return

    setFile(event.target.files[0])
  }, [])

  return (
    <S.SelectFileButton fileSelected={!!file}>
      {file ? 'Arquivo Selecionado!' : 'Selecionar Arquivo'}

      <input type="file" onChange={handleSelectFile} />
    </S.SelectFileButton>
  )
}
