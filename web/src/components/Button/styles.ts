import styled from 'styled-components'

import * as T from './types'

export const ButtonContainer = styled.button<T.ButtonContainerProps>`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  max-width: 18rem;
  margin: 0 auto;
  text-transform: uppercase;
  font-weight: var(--fonts-weight-medium);
  background-color: var(--colors-main-${({ color }) => color}-100);

  svg {
    margin-right: 0.5rem;
  }
`
