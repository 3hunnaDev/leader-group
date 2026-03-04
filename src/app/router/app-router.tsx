import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@pages/home'
import { NotFoundPage } from '@pages/not-found'
import { AppLayout } from '../layouts/app-layout'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
