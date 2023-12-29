import styled from 'styled-components'

export const DateIntervalInputContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  height: 3.125rem;
  padding: 0 1rem;
  background-color: var(--colors-background-dark-100);
  border-radius: var(--borders-radius-big);

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  label {
    margin-right: 0.875rem;
    padding: 1rem 0;
    font-weight: var(--fonts-weight-medium);
  }

  input {
    filter: invert(1);
    display: block;
    height: calc(100% - 0.5rem);
    border: none;
    color: var(--colors-text-main-100);
    background-color: var(--colors-background-transparent);
  }

  input::placeholder {
    color: var(--colors-text-main-100) !important;
  }
`
