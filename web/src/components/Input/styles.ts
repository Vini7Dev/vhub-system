import styled, { css } from 'styled-components'

import * as T from './types'

export const InputContainer = styled.div<T.InputContainerProps>`
  position: relative;
  width: 100%;
  max-width: 20rem;
  margin-bottom: 1.75rem;

  label {
    position: absolute;
    top: -0.85rem;
    color: var(${({ filled }) => filled ? '--colors-text-default-100' : '--colors-text-placeholder'});
    transition: 200ms color;
  }

  input {
    width: 100%;
    padding: 0.5rem 0.3rem;
    border: none;
    border-bottom: 0.063rem solid var(--colors-text-placeholder);
    background-color: var(--colors-background-transparent);
    color: var(${({ filled }) => filled ? '--colors-text-default-100' : '--colors-text-placeholder'});
    transition: 200ms color;
  }

  &:hover label,
  &:hover select {
    ${({ filled }) => !filled && css`color: var(--colors-text-default-80);`}
  }
`
