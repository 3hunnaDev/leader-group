import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { navigationItems } from '@shared/config/navigation'
import { getLocationTarget } from '@shared/lib/hash-navigation'
import { resolvePageTitle } from '../model/resolve-page-title'
import { useActiveNavigationHref } from '../model/use-active-navigation-href'
import { SiteHeaderDesktop } from './components/site-header-desktop'
import { SiteHeaderMobile } from './components/site-header-mobile'
import './site-header.css'

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { i18n, t } = useTranslation()
  const location = useLocation()
  const activeHref = useActiveNavigationHref(navigationItems)
  const headerRef = useRef<HTMLElement>(null)
  const mobileRootRef = useRef<HTMLDivElement>(null)
  const locationTarget = getLocationTarget(location.pathname, location.hash)

  useEffect(() => {
    const syncMenuWithRenderedLayout = () => {
      const mobileRootElement = mobileRootRef.current

      if (!mobileRootElement || !isMenuOpen) {
        return
      }

      if (window.getComputedStyle(mobileRootElement).display === 'none') {
        setIsMenuOpen(false)
      }
    }

    syncMenuWithRenderedLayout()
    window.addEventListener('resize', syncMenuWithRenderedLayout)

    return () => {
      window.removeEventListener('resize', syncMenuWithRenderedLayout)
    }
  }, [isMenuOpen])

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

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', scheduleHeaderToneUpdate)
      window.removeEventListener('resize', handleViewportOrContentChange)
      window.removeEventListener('load', handleViewportOrContentChange)
    }
  }, [location.hash, location.pathname])

  useEffect(() => {
    document.title = resolvePageTitle(navigationItems, locationTarget, t)
  }, [i18n.resolvedLanguage, locationTarget, t])

  return (
    <header ref={headerRef} className="site-header">
      <SiteHeaderMobile
        rootRef={mobileRootRef}
        navigationItems={navigationItems}
        activeHref={activeHref}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((state) => !state)}
        onCloseMenu={() => setIsMenuOpen(false)}
      />
      <SiteHeaderDesktop navigationItems={navigationItems} activeHref={activeHref} />
    </header>
  )
}
