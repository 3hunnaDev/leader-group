export const ROUTE_SEGMENTS = {
  assortmentServices: 'assortment-services',
  about: 'about',
  contacts: 'contacts',
} as const

export const ROUTE_PATHS = {
  root: '/',
  assortmentServices: `/${ROUTE_SEGMENTS.assortmentServices}`,
  about: `/${ROUTE_SEGMENTS.about}`,
  contacts: `/${ROUTE_SEGMENTS.contacts}`,
} as const

export type AppRoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS]
