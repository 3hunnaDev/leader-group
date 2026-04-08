import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { normalizeHash, scrollToHashTarget } from '@shared/lib/hash-navigation'
import { SiteHeader } from '@widgets/site-header'
import './app-layout.css'

export function AppLayout() {
  const location = useLocation()
  const isFirstScrollRef = useRef(true)

  useEffect(() => {
    let frameId = 0
    const behavior = isFirstScrollRef.current ? 'auto' : 'smooth'

    frameId = window.requestAnimationFrame(() => {
      if (location.pathname !== '/') {
        window.scrollTo({ top: 0, behavior })
        return
      }

      scrollToHashTarget(normalizeHash(location.pathname, location.hash), behavior)
    })

    isFirstScrollRef.current = false

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [location.hash, location.pathname])

  return (
    <div className="app-layout">
      <SiteHeader />
      <div className="app-layout__content">
        <Outlet />
      </div>
    </div>
  )
}
