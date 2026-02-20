import { RouterProvider } from 'react-router-dom'
import { appRouter } from '@/app/router/app-router'

export function AppRoot() {
  return <RouterProvider router={appRouter} />
}
