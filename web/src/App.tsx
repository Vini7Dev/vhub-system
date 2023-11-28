import React from 'react'

import GlobalStyle from './global/styles'
import { NavigationBar } from './components/NavigationBar'
// import { HomePage } from './pages/HomePage'
import { Records } from './pages/Records'

export const App: React.FC = () => {
  return (
    <>
      <NavigationBar />

      <main>
        {/* <HomePage /> */}
        <Records />
      </main>

      <GlobalStyle />
    </>
  )
}
