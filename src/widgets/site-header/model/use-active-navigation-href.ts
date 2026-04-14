import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { NavigationItem } from '@shared/config/navigation'
import { getLocationTarget } from '@shared/lib/hash-navigation'

const HOME_HREF = '/#home'
const HEADER_SELECTOR = '.site-header'
const SCROLL_PROBE_OFFSET_PX = 24

type NavigationSectionBounds = {
  bottom: number
  href: NavigationItem['href']
  top: number
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

export function resolveActiveNavigationHrefBySectionBounds(
  bounds: NavigationSectionBounds[],
  probeY: number,
) {
  let nearestHref: NavigationItem['href'] | null = null

  for (const section of bounds) {
    if (section.top <= probeY) {
      nearestHref = section.href
    }

    if (section.top <= probeY && section.bottom > probeY) {
      return section.href
    }
  }

  return nearestHref
}

function getNavigationItemTargetId(href: string) {
  const hashIndex = href.indexOf('#')

  if (hashIndex === -1) {
    return null
  }

  return decodeURIComponent(href.slice(hashIndex + 1))
}

function resolveActiveNavigationHrefByScroll(items: NavigationItem[]) {
  if (typeof document === 'undefined') {
    return null
  }

  const headerOffset =
    document.querySelector<HTMLElement>(HEADER_SELECTOR)?.getBoundingClientRect().height ?? 0
  const probeY = headerOffset + SCROLL_PROBE_OFFSET_PX
  const sectionBounds = items
    .map((item) => {
      const targetId = getNavigationItemTargetId(item.href)

      if (!targetId) {
        return null
      }

      const sectionElement = document.getElementById(targetId)

      if (!sectionElement) {
        return null
      }

      const { bottom, top } = sectionElement.getBoundingClientRect()

      return {
        bottom,
        href: item.href,
        top,
      }
    })
    .filter((section): section is NavigationSectionBounds => section !== null)

  return resolveActiveNavigationHrefBySectionBounds(sectionBounds, probeY)
}

export function useActiveNavigationHref(items: NavigationItem[]) {
  const location = useLocation()
  const locationTarget = getLocationTarget(location.pathname, location.hash)
  const fallbackHref = resolveActiveNavigationHref(items, locationTarget)
  const [scrollActiveHref, setScrollActiveHref] = useState<NavigationItem['href'] | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || location.pathname !== '/') {
      return
    }

    let frameId = 0

    const updateActiveHref = () => {
      setScrollActiveHref(resolveActiveNavigationHrefByScroll(items))
    }

    const scheduleActiveHrefUpdate = () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }

      frameId = window.requestAnimationFrame(updateActiveHref)
    }

    scheduleActiveHrefUpdate()

    window.addEventListener('scroll', scheduleActiveHrefUpdate, {
      passive: true,
    })
    window.addEventListener('resize', scheduleActiveHrefUpdate)
    window.addEventListener('load', scheduleActiveHrefUpdate)

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', scheduleActiveHrefUpdate)
      window.removeEventListener('resize', scheduleActiveHrefUpdate)
      window.removeEventListener('load', scheduleActiveHrefUpdate)
    }
  }, [items, location.pathname])

  if (location.pathname !== '/') {
    return fallbackHref
  }

  return scrollActiveHref ?? fallbackHref
}
