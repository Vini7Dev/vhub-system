import styled from 'styled-components'

import * as T from './types'

export const SelectFileButton = styled.label<T.SelectFileButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.75rem;
  width: 100%;
  max-width: 17.5rem;
  margin-bottom: 2.375rem;
  color:var(${({ fileSelected }) => fileSelected ? '--colors-main-success-100' : '--colors-text-default-100'});
  border: 0.063rem solid var(${({ fileSelected }) => fileSelected ? '--colors-main-success-100' : '--colors-main-info-100'});
  font-size: var(--fonts-size-button-normal);
  font-weight: var(--fonts-weight-medium);

  input {
    display: none;
  }
`
