import { useEffect, useRef, useState } from 'react'
import { navigationItems } from '@shared/config/navigation'
import { resolvePageTitle } from '../model/resolve-page-title'
import { useActiveNavigationHref } from '../model/use-active-navigation-href'
import { SiteHeaderDesktop } from './components/site-header-desktop'
import { SiteHeaderMobile } from './components/site-header-mobile'

function getLocationTarget() {
  return `${window.location.pathname}${window.location.hash}`
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { activeHref, setActiveHref } = useActiveNavigationHref(navigationItems)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)')

    const handleDesktopMode = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false)
      }
    }

    desktopQuery.addEventListener('change', handleDesktopMode)

    return () => {
      desktopQuery.removeEventListener('change', handleDesktopMode)
    }
  }, [])

  useEffect(() => {
    const headerElement = headerRef.current

    if (!headerElement) {
      return
    }

    let frameId = 0
    const darkToneSelector = "[data-header-tone='dark']"
    let darkZones: HTMLElement[] = []

    const refreshDarkZones = () => {
      darkZones = Array.from(document.querySelectorAll<HTMLElement>(darkToneSelector))
    }

    const updateHeaderTone = () => {
      const headerRect = headerElement.getBoundingClientRect()

      const isOnDarkZone = darkZones.some((zone) => {
        const zoneRect = zone.getBoundingClientRect()

        return zoneRect.bottom > headerRect.top && zoneRect.top < headerRect.bottom
      })

      headerElement.classList.toggle('site-header--on-dark', isOnDarkZone)
    }

    const scheduleHeaderToneUpdate = () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }

      frameId = window.requestAnimationFrame(updateHeaderTone)
    }

    const handleViewportOrContentChange = () => {
      refreshDarkZones()
      scheduleHeaderToneUpdate()
    }

    refreshDarkZones()
    scheduleHeaderToneUpdate()

    window.addEventListener('scroll', scheduleHeaderToneUpdate, {
      passive: true,
    })
    window.addEventListener('resize', handleViewportOrContentChange)
    window.addEventListener('load', handleViewportOrContentChange)
    window.addEventListener('hashchange', handleViewportOrContentChange)
    window.addEventListener('popstate', handleViewportOrContentChange)

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', scheduleHeaderToneUpdate)
      window.removeEventListener('resize', handleViewportOrContentChange)
      window.removeEventListener('load', handleViewportOrContentChange)
      window.removeEventListener('hashchange', handleViewportOrContentChange)
      window.removeEventListener('popstate', handleViewportOrContentChange)
    }
  }, [])

  useEffect(() => {
    const updatePageTitle = () => {
      document.title = resolvePageTitle(navigationItems, getLocationTarget())
    }

    updatePageTitle()
    window.addEventListener('hashchange', updatePageTitle)
    window.addEventListener('popstate', updatePageTitle)

    return () => {
      window.removeEventListener('hashchange', updatePageTitle)
      window.removeEventListener('popstate', updatePageTitle)
    }
  }, [])

  return (
    <header ref={headerRef} className="site-header">
      <SiteHeaderMobile
        navigationItems={navigationItems}
        activeHref={activeHref}
        onNavigate={setActiveHref}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((state) => !state)}
        onCloseMenu={() => setIsMenuOpen(false)}
      />
      <SiteHeaderDesktop
        navigationItems={navigationItems}
        activeHref={activeHref}
        onNavigate={setActiveHref}
      />
    </header>
  )
}
