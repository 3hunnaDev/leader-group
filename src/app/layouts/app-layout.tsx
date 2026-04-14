import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import {
  getInitialScrollBehavior,
  getLocationTarget,
  getPersistedScrollRestoreState,
  normalizeHash,
  resolveHashTargetTop,
  type ScrollRestoreState,
  scrollToTopPosition,
} from '@shared/lib/hash-navigation'
import { SiteHeader } from '@widgets/site-header'
import './app-layout.css'

type ScrollTarget = {
  href: string | null
  top: number | null
}

function resolveScrollTarget({
  hash,
  initialRestoreSnapshot,
  isInitialScroll,
  pathname,
}: {
  hash: string
  initialRestoreSnapshot: ScrollRestoreState | null
  isInitialScroll: boolean
  pathname: string
}): ScrollTarget {
  const hasExplicitHash = hash !== '' && hash !== '#'
  const normalizedHash = hasExplicitHash ? normalizeHash(pathname, hash) : ''
  const persistedSnapshot =
    initialRestoreSnapshot && initialRestoreSnapshot.pathname === pathname
      ? initialRestoreSnapshot
      : null

  if (pathname !== '/') {
    return {
      href: null,
      top: 0,
    }
  }

  if (isInitialScroll && persistedSnapshot?.mode === 'scroll' && persistedSnapshot.top !== null) {
    return {
      href: persistedSnapshot.href,
      top: persistedSnapshot.top,
    }
  }

  if (hasExplicitHash) {
    return {
      href: getLocationTarget(pathname, normalizedHash),
      top: resolveHashTargetTop(normalizedHash),
    }
  }

  return {
    href: null,
    top: 0,
  }
}

export function AppLayout() {
  const location = useLocation()
  const isFirstScrollRef = useRef(true)
  const [initialRestoreSnapshot] = useState<ScrollRestoreState | null>(() => {
    if (typeof window === 'undefined') {
      return null
    }

    return getPersistedScrollRestoreState()
  })
  const [lockedActiveHref, setLockedActiveHref] = useState<string | null>(() => {
    const initialScrollTarget = resolveScrollTarget({
      hash: location.hash,
      initialRestoreSnapshot,
      isInitialScroll: true,
      pathname: location.pathname,
    })

    return initialScrollTarget.top !== null && initialScrollTarget.top > 0
      ? initialScrollTarget.href
      : null
  })

  useLayoutEffect(() => {
    if (!isFirstScrollRef.current) {
      return
    }

    const scrollTarget = resolveScrollTarget({
      hash: location.hash,
      initialRestoreSnapshot,
      isInitialScroll: true,
      pathname: location.pathname,
    })

    if (location.pathname !== '/' || scrollTarget.top === null || scrollTarget.top <= 0) {
      return
    }

    scrollToTopPosition(0, 'auto')
  }, [initialRestoreSnapshot, location.hash, location.pathname])

  useEffect(() => {
    let frameId = 0
    let setupFrameId = 0
    let releaseFrameId = 0
    let releaseTimeoutId = 0
    const isInitialScroll = isFirstScrollRef.current
    const cleanupLockListeners = () => {
      window.removeEventListener('wheel', releaseLockedActiveHref)
      window.removeEventListener('touchmove', releaseLockedActiveHref)
      window.removeEventListener('keydown', handleLockOverrideKeydown)
      window.removeEventListener('pointerdown', releaseLockedActiveHref)
    }
    const releaseLockedActiveHref = () => {
      if (releaseFrameId) {
        cancelAnimationFrame(releaseFrameId)
        releaseFrameId = 0
      }

      if (releaseTimeoutId) {
        window.clearTimeout(releaseTimeoutId)
        releaseTimeoutId = 0
      }

      cleanupLockListeners()
      setLockedActiveHref(null)
    }
    const handleLockOverrideKeydown = (event: KeyboardEvent) => {
      if (
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp' ||
        event.key === 'PageDown' ||
        event.key === 'PageUp' ||
        event.key === 'Home' ||
        event.key === 'End' ||
        event.key === ' '
      ) {
        releaseLockedActiveHref()
      }
    }
    const runScroll = () => {
      isFirstScrollRef.current = false

      const scrollTarget = resolveScrollTarget({
        hash: location.hash,
        initialRestoreSnapshot,
        isInitialScroll,
        pathname: location.pathname,
      })
      const { href: targetHref, top: targetTop } = scrollTarget

      if (location.pathname !== '/') {
        const behavior = isInitialScroll ? getInitialScrollBehavior(window.scrollY, 0) : 'smooth'
        setLockedActiveHref(null)
        window.scrollTo({ top: 0, behavior })
        return
      }

      if (targetTop !== null) {
        const behavior = isInitialScroll
          ? getInitialScrollBehavior(window.scrollY, targetTop)
          : 'smooth'

        if (behavior === 'smooth' && targetHref) {
          setLockedActiveHref(targetHref)

          window.addEventListener('wheel', releaseLockedActiveHref, { passive: true })
          window.addEventListener('touchmove', releaseLockedActiveHref, { passive: true })
          window.addEventListener('pointerdown', releaseLockedActiveHref, { passive: true })
          window.addEventListener('keydown', handleLockOverrideKeydown)

          const releaseLock = () => {
            if (Math.abs(window.scrollY - targetTop) <= 4) {
              releaseLockedActiveHref()
              return
            }

            releaseFrameId = window.requestAnimationFrame(releaseLock)
          }

          releaseTimeoutId = window.setTimeout(releaseLockedActiveHref, 1600)
          releaseFrameId = window.requestAnimationFrame(releaseLock)
        } else {
          releaseLockedActiveHref()
        }

        scrollToTopPosition(targetTop, behavior)
        return
      }

      releaseLockedActiveHref()
    }

    if (isInitialScroll) {
      setupFrameId = window.requestAnimationFrame(() => {
        frameId = window.requestAnimationFrame(runScroll)
      })
    } else {
      frameId = window.requestAnimationFrame(runScroll)
    }

    return () => {
      if (setupFrameId) {
        cancelAnimationFrame(setupFrameId)
      }

      if (frameId) {
        cancelAnimationFrame(frameId)
      }

      if (releaseFrameId) {
        cancelAnimationFrame(releaseFrameId)
      }

      if (releaseTimeoutId) {
        window.clearTimeout(releaseTimeoutId)
      }

      cleanupLockListeners()
    }
  }, [initialRestoreSnapshot, location.hash, location.pathname])

  return (
    <div className="app-layout">
      <SiteHeader lockedActiveHref={lockedActiveHref} />
      <div className="app-layout__content">
        <Outlet />
      </div>
    </div>
  )
}
