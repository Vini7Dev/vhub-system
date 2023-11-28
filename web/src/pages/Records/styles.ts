import styled from 'styled-components'

import * as T from './types'

export const BankSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.25rem;
  max-width: 22rem;
  margin: 0 auto 1.25rem;
  border-radius: var(--borders-radius-big);
  background-color: var(--colors-main-primary-50);
`

export const BankSelectorButton = styled.button<T.BankSelectorButtonProps>`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: var(--fonts-weight-medium);
  border-radius: var(--borders-radius-big);
  text-transform: uppercase;
  border: 0.125rem solid var(${({ selected }) => selected ? '--colors-background-dark-100' : '--colors-background-transparent'});
  color: var(${({ selected }) => selected ? '--colors-text-default-100' : '--colors-text-default-75'});
  background-color: var(${({ selected }) => selected ? '--colors-main-primary-100' : '--colors-background-transparent'});
`

export const RecordsTable = styled.table`
  width: 100%;
  max-width: 1000px;
  margin: 0.875rem auto 0;
  border-collapse: separate;
  border-spacing: 0 0.5em;

  tr {
    height: 3rem;
    margin-bottom: 20px;

    th,
    td {
      padding: 0.5rem;
      background-color: var(--colors-background-dark-100);
      border-bottom: 0.063rem solid var(--colors-main-info-100);
    }

    th:first-child,
    td:first-child {
      border-radius: var(--borders-radius-normal-left);
    }

    th:last-child,
    td:last-child {
      border-radius: var(--borders-radius-normal-right);
    }

    th {
      font-weight: var(--fonts-weight-medium);
      font-size: var(--fonts-size-text-big);
      color: var(--colors-text-default-100);
    }

    td {
      font-weight: var(--fonts-weight-regular);
      font-size: var(--fonts-size-text-normal);
      color: var(--colors-text-default-75);
    }

    th.small,
    td.small {
      width: 25%;
    }

    th.big,
    td.big {
      width: 50%;
    }

    .text_center {
      text-align: center;
    }

    .text_left {
      text-align: left;
    }

    .text_success {
      color: var(--colors-main-success-100);
    }

    .text_danger {
      color: var(--colors-main-danger-100);
    }

    .border_success {
      border-color: var(--colors-main-success-100);
    }

    .border_danger {
      border-color: var(--colors-main-danger-100);
    }
  }

  @media screen and (min-width: 768px) {
    tr th:first-child,
    tr td:first-child,
    tr th:last-child,
    tr td:last-child {
      padding: 0.5rem 2rem;
    }
  }
`
