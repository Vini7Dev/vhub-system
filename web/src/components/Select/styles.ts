import styled, { css } from 'styled-components'

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
    transition: 200ms color;
  }

  select {
    width: 100%;
    padding: 0.5rem 0;
    border: none;
    border-bottom: 0.063rem solid var(--colors-text-placeholder);
    background-color: var(--colors-background-transparent);
    color: var(${({ selected }) => selected ? '--colors-text-default-100' : '--colors-text-placeholder'});
    transition: 200ms color;

    option {
      background-color: var(--colors-background-default-100);
    }
  }

  &:hover label,
  &:hover select {
    ${({ selected }) => !selected && css`color: var(--colors-text-default-80);`}
  }
`
