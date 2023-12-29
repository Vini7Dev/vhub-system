import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { HomePage } from '../pages/HomePage'
import { Records } from '../pages/Records'

export const AppRoutes: React.FC = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/records" element={<Records />} />
    </Routes>
  )
}
