import { Navigate, type RouteObject } from 'react-router-dom'
import { AppLayout } from '@/layouts/app-layout/app-layout'
import { AboutPage } from '@/pages/about-page/about-page'
import { AssortmentServicesPage } from '@/pages/assortment-services-page/assortment-services-page'
import { ContactsPage } from '@/pages/contacts-page/contacts-page'
import { ROUTE_PATHS, ROUTE_SEGMENTS } from '@/shared/config/route-paths'

export const APP_ROUTE_CONFIG: RouteObject[] = [
  {
    path: ROUTE_PATHS.root,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTE_PATHS.assortmentServices} replace />,
      },
      {
        path: ROUTE_SEGMENTS.assortmentServices,
        element: <AssortmentServicesPage />,
      },
      {
        path: ROUTE_SEGMENTS.about,
        element: <AboutPage />,
      },
      {
        path: ROUTE_SEGMENTS.contacts,
        element: <ContactsPage />,
      },
    ],
  },
]
