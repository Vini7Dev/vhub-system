import React from 'react'
import ReactDOM from 'react-dom/client'

import './global/styles/fonts.css'
import GlobalStyle from './global/styles'
import { HomePage } from './pages/HomePage'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <HomePage />

    <GlobalStyle />
  </React.StrictMode>
)
