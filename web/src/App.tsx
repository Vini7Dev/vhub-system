import React from 'react'

import GlobalStyle from './global/styles'
import { NavigationBar } from './components/NavigationBar'
import { AppRoutes } from './routes'

export const App: React.FC = () => {
  return (
    <>
      <NavigationBar />

      <main>
        <AppRoutes />
      </main>

      <GlobalStyle />
    </>
  )
}
