import React from 'react'

import GlobalStyle from './global/styles'
import { NavigationBar } from './components/NavigationBar'
import { HomePage } from './pages/HomePage'

export const App: React.FC = () => {
  return (
    <>
      <NavigationBar />

      <main>
        <HomePage />
      </main>

      <GlobalStyle />
    </>
  )
}
