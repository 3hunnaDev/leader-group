import type { NavigationItem } from '@/shared/types/navigation-item'
import { ROUTE_PATHS } from '@/shared/config/route-paths'

export const HEADER_NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    id: 'assortment-services',
    label: 'Ассортимент и услуги',
    to: ROUTE_PATHS.assortmentServices,
  },
  {
    id: 'about',
    label: 'О нас',
    to: ROUTE_PATHS.about,
  },
  {
    id: 'contacts',
    label: 'Контакты',
    to: ROUTE_PATHS.contacts,
  },
]
