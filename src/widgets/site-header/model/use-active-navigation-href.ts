import { useEffect, useState } from 'react'
import type { NavigationItem } from '@shared/config/navigation'

const HOME_HREF = '/#home'

function getLocationTarget() {
  return `${window.location.pathname}${window.location.hash}`
}

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
  const [activeHref, setActiveHref] = useState<NavigationItem['href'] | null>(() => {
    if (typeof window === 'undefined') {
      return HOME_HREF
    }

    return resolveActiveNavigationHref(items, getLocationTarget())
  })

  useEffect(() => {
    const handleLocationChange = () => {
      setActiveHref(resolveActiveNavigationHref(items, getLocationTarget()))
    }

    window.addEventListener('hashchange', handleLocationChange)
    window.addEventListener('popstate', handleLocationChange)

    return () => {
      window.removeEventListener('hashchange', handleLocationChange)
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [items])

  return { activeHref, setActiveHref }
}
