import { useLocation } from 'react-router-dom'
import type { NavigationItem } from '@shared/config/navigation'
import { getLocationTarget } from '@shared/lib/hash-navigation'

const HOME_HREF = '/#home'

export function resolveActiveNavigationHref(
  items: NavigationItem[],
  locationTarget: string,
): NavigationItem['href'] | null {
  const matchedItem = items.find((item) => item.href === locationTarget)

  if (matchedItem) {
    return matchedItem.href
  }

  if (locationTarget === '/' || locationTarget === '') {
    return HOME_HREF
  }

  return null
}

export function useActiveNavigationHref(items: NavigationItem[]) {
  const location = useLocation()

  return resolveActiveNavigationHref(items, getLocationTarget(location.pathname, location.hash))
}
