import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { HomePage } from '../pages/HomePage'
import { Records } from '../pages/Records'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/records',
    element: <Records />,
  },
])

export const Routes: React.FC = () => {
  return <RouterProvider router={router} />
}
