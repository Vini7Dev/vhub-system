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
`

export const BankSelectorButton = styled.button<T.BankSelectorButtonProps>`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: var(--fonts-weight-medium);
  text-transform: uppercase;
  color: var(--colors-text-default-100);
  background-color: var(${({ selected }) => selected ? '--colors-main-primary-100' : '--colors-background-transparent'});
  border: 2px solid var(${({ selected }) => selected ? '--colors-background-transparent' : '--colors-main-primary-100'});
  border-radius: var(${({ borderRadius }) => borderRadius === 'left'
    ? '--borders-radius-big-left'
    : borderRadius === 'right'
      ? '--borders-radius-big-right'
      : '--borders-radius-big'});
  transition: 200ms;

  &:hover {
    background-color: var(--colors-main-primary-100);
  }
`

export const RecordsTable = styled.table`
  width: 100%;
  max-width: 1000px;
  margin: 0.875rem auto 0;
  border-collapse: separate;
  border-spacing: 0 0.5em;

  thead tr {
    height: 3rem;
  }

  tbody tr {
    height: 2.5rem;
    transition: 200ms scale;

    &:hover {
      scale: 1.01;
    }
  }

  tr {
    th {
      padding: 0.5rem;
      font-weight: var(--fonts-weight-medium);
      font-size: var(--fonts-size-text-big);
      color: var(--colors-text-default-100);
      background-color: var(--colors-main-primary-100);
      border-bottom: 0.125rem solid var(--colors-text-default-100);
    }

    td {
      padding: 0.5rem;
      font-weight: var(--fonts-weight-regular);
      font-size: var(--fonts-size-text-normal);
      color: var(--colors-text-default-75);
      background-color: var(--colors-background-dark-75);
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

    th.tiny,
    td.tiny {
      width: 1%;
      padding: 0 0 0 1rem !important;
    }

    th.small,
    td.small {
      width: 3%;
      padding: 0 2rem 0 0 !important;
    }

    th.small-b,
    td.small-b {
      width: 2%;
      padding: 0 2rem 0 0 !important;
    }

    th.big,
    td.big {
      width: 20%;
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


    @media screen and (max-width: 728px) {
      th:first-child,
      td:first-child {
        display: none;
      }

      th.small,
      td.small,
      th.small-b,
      td.small-b {
        width: 10%;
        padding: 0.5rem !important;
      }
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
