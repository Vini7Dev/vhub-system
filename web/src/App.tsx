import React from 'react'

import GlobalStyle from './global/styles'
import { NavigationBar } from './components/NavigationBar'
import { Routes } from './routes'

export const App: React.FC = () => {
  return (
    <>
      <NavigationBar />

      <main>
        <Routes />
      </main>

      <GlobalStyle />
    </>
  )
}
