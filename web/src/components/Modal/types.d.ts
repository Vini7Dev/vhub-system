import React from 'react'

export interface ModalProps {
  title: string
  close: () => void
  Content: React.FC
}
