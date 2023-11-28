import React, { useEffect } from 'react'
import { FiX } from 'react-icons/fi'

import * as T from './types'
import * as S from './styles'
import { theme } from '../../global/styles/theme'

export const Modal: React.FC<T.ModalProps> = ({ title, close, Content }) => {
  const updateBodyScrollIsEnabled = (enabled = false) => {
    document.body.style.overflow = enabled ? 'scroll' : 'hidden'
  }

  const closeModal = () => {
    updateBodyScrollIsEnabled(true)

    close()
  }

  useEffect(() => {
    updateBodyScrollIsEnabled()
  }, [])

  return (
    <S.ModalContainer>
      <S.ModalOutsideBackground onClick={closeModal} />

      <S.ModalContent>
        <header>
          <h2>{title}</h2>

          <FiX size={24} color={theme.colors.text.default[100]} onClick={closeModal} />
        </header>

        <div>
          <Content />
        </div>
      </S.ModalContent>
    </S.ModalContainer>
  )
}
