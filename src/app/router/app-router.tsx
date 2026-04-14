import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@pages/home'
import { NotFoundPage } from '@pages/not-found'
import { AppLayout } from '../layouts/app-layout'

const appBasename =
  import.meta.env.BASE_URL === '/' ? '/' : import.meta.env.BASE_URL.replace(/\/$/, '')

export const appRoutes: RouteObject[] = [
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
]

export const appRouter = createBrowserRouter(appRoutes, {
  basename: appBasename,
})
