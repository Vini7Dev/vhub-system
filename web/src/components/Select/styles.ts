import styled from 'styled-components'

import * as T from './types'

export const SelectContainer = styled.div<T.SelectContainerProps>`
  position: relative;
  width: 100%;
  max-width: 20rem;
  margin-bottom: 1.75rem;

  label {
    position: absolute;
    top: -0.85rem;
    color: var(${({ selected }) => selected ? '--colors-text-default-100' : '--colors-text-placeholder'});
  }

  select {
    width: 100%;
    padding: 0.5rem 0;
    border: none;
    border-bottom: 0.063rem solid var(--colors-text-placeholder);
    background-color: var(--colors-background-transparent);
    color: var(${({ selected }) => selected ? '--colors-text-default-100' : '--colors-text-placeholder'});

    option {
      background-color: var(--colors-background-default-100);
    }
  }
`
