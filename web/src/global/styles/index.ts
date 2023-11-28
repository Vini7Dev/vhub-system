import { createGlobalStyle } from 'styled-components'

import { theme } from './theme'

export const GlobalStyle = createGlobalStyle`
  :root {
    /* COLORS */
    --colors-main-primary-100: ${theme.colors.main.primary[100]};
    --colors-main-primary-50: ${theme.colors.main.primary[50]};
    --colors-main-secondary-100: ${theme.colors.main.secondary[100]};
    --colors-main-tertiary-100: ${theme.colors.main.tertiary[100]};
    --colors-main-success-100: ${theme.colors.main.success[100]};
    --colors-main-danger-100: ${theme.colors.main.danger[100]};
    --colors-main-info-100: ${theme.colors.main.info[100]};

    --colors-text-default-100: ${theme.colors.text.default[100]};
    --colors-text-default-75: ${theme.colors.text.default[75]};
    --colors-text-placeholder: ${theme.colors.text.placeholder};

    --colors-background-transparent: ${theme.colors.background.transparent};
    --colors-background-default-100: ${theme.colors.background.default[100]};
    --colors-background-default-75: ${theme.colors.background.default[75]};
    --colors-background-dark-100: ${theme.colors.background.dark[100]};

    /* FONT FAMILY */
    --fonts-family-main: ${theme.fonts.family.main};

    /* FONT WEIGHT */
    --fonts-weight-bold: ${theme.fonts.weight.bold};
    --fonts-weight-medium: ${theme.fonts.weight.medium};
    --fonts-weight-regular: ${theme.fonts.weight.regular};

    /* FONT SIZE */
    --fonts-size-heading-h1: ${theme.fonts.size.heading.h1};        /* 32px */
    --fonts-size-heading-h2: ${theme.fonts.size.heading.h2};        /* 18px */

    --fonts-size-text-big: ${theme.fonts.size.text.big};            /* 18px */
    --fonts-size-text-normal: ${theme.fonts.size.text.normal};      /* 16px */
    --fonts-size-text-small: ${theme.fonts.size.text.small};        /* 14px */

    --fonts-size-input-label: ${theme.fonts.size.input.label};      /* 14px */
    --fonts-size-input-text: ${theme.fonts.size.input.text};        /* 16px */

    --fonts-size-button-normal: ${theme.fonts.size.button.normal};  /* 18px */
    --fonts-size-button-small: ${theme.fonts.size.button.small};    /* 16px */

    /* ICONS SIZE */
    --icons-size-big: ${theme.icons.size.big};        /* 32px */
    --icons-size-normal: ${theme.icons.size.normal};  /* 24px */
    --icons-size-small: ${theme.icons.size.small};    /* 18px */

    /* BORDER RADIUS */
    --borders-radius-big: ${theme.borders.radius.big.all};                /* 8px */
    --borders-radius-normal: ${theme.borders.radius.normal.all};          /* 4px */
    --borders-radius-normal-left: ${theme.borders.radius.normal.left};    /* 4px */
    --borders-radius-normal-right: ${theme.borders.radius.normal.right};  /* 4px */
  }

  * {
    margin: 0;
    padding: 0;
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -moz-tab-size: 4;
    tab-size: 4;
  }

  body {
    position: relative;
    background: var(--colors-background-default-100);
  }

  main {
    width: 100%;
    max-width: 1200px;
    margin: 5.375rem auto 0;
    padding: 0 1rem;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px;
    padding: 1px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  span,
  strong,
  label,
  input
  textarea,
  select,
  button,
  td,
  th {
    font-family: var(--fonts-family-main), sans-serif;
    color: var(--colors-text-default-100);
  }

  input::placeholder,
  textarea::placeholder,
  select::placeholder {
    color: var(--colors-text-placeholder);
  }

  h1 {
    font-size: var(--fonts-size-heading-h1);
  }

  h2 {
    font-size: var(--fonts-size-heading-h2);
  }

  p,
  strong,
  span,
  td {
    font-size: var(--fonts-size-text-normal);
  }

  a {
    text-decoration: none;
  }

  input
  textarea,
  select {
    font-size: var(--fonts-size-input-text);
  }

  label {
    font-size: var(--fonts-size-input-label);
  }

  button {
    font-size: var(--fonts-size-button-normal);
    border-radius: var(--borders-radius-normal);
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    outline: none !important;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    cursor: pointer;
    -webkit-appearance: button;
  }

  button {
    display: flex;
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    -webkit-appearance: none;
  }

  table {
    text-indent: 0;
    border-collapse: collapse;
    border-spacing: 0;
  }
`

export default GlobalStyle
