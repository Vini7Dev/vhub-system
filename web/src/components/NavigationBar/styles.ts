import styled from 'styled-components'

import * as T from './types'

export const Navigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.625rem;
  background-color: var(--colors-main-primary-100);
`

export const NavLink = styled.span<T.NavLinkProps>`
  margin: 0 1rem;
  font-weight: var(${({ selected }) => selected ? '--fonts-weight-bold' : '--fonts-weight-medium'});
  font-size: var(--fonts-size-text-big);
  color: var(${({ selected }) => selected ? '--colors-text-default-100' : '--colors-text-default-75'});
  transition: 200ms color;

  &:hover {
    color: var(--colors-text-default-100);
  }
`
