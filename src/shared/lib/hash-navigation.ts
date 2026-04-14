const HOME_HASH = '#home'
const HEADER_SELECTOR = '.site-header'
const HEADER_GAP_PX = 12
const SCROLL_RESTORE_STATE_STORAGE_KEY = 'leader-group:scroll-restore-state'

export type ScrollRestoreStateMode = 'anchor' | 'scroll'

export type ScrollRestoreState = {
  href: string | null
  mode: ScrollRestoreStateMode
  pathname: string
  top: number | null
}

export function getLocationTarget(pathname: string, hash: string) {
  return `${pathname}${hash}`
}

export function normalizeHash(pathname: string, hash: string) {
  if (pathname === '/' && (hash === '' || hash === '#')) {
    return HOME_HASH
  }

  return hash
}

export function resolveHashLinkTarget(to: string, origin: string) {
  const targetUrl = new URL(to, origin)

  return {
    hash: normalizeHash(targetUrl.pathname, targetUrl.hash),
    pathname: targetUrl.pathname,
  }
}

export function getPersistedScrollRestoreState(): ScrollRestoreState | null {
  if (typeof window === 'undefined') {
    return null
  }

  const persistedState = window.sessionStorage.getItem(SCROLL_RESTORE_STATE_STORAGE_KEY)

  if (persistedState) {
    try {
      const parsedState = JSON.parse(persistedState) as Partial<ScrollRestoreState>
      const top =
        parsedState.top === null || parsedState.top === undefined
          ? null
          : Number.isFinite(parsedState.top)
            ? Math.max(0, parsedState.top)
            : null

      if (
        (parsedState.mode === 'anchor' || parsedState.mode === 'scroll') &&
        typeof parsedState.pathname === 'string'
      ) {
        return {
          href: typeof parsedState.href === 'string' ? parsedState.href : null,
          mode: parsedState.mode,
          pathname: parsedState.pathname,
          top,
        }
      }
    } catch {
      window.sessionStorage.removeItem(SCROLL_RESTORE_STATE_STORAGE_KEY)
    }
  }

  return null
}

export function persistScrollRestoreState(state: ScrollRestoreState | null) {
  if (typeof window === 'undefined') {
    return
  }

  if (!state) {
    window.sessionStorage.removeItem(SCROLL_RESTORE_STATE_STORAGE_KEY)
    return
  }

  const top = state.top === null || !Number.isFinite(state.top) ? null : Math.max(0, state.top)

  window.sessionStorage.setItem(
    SCROLL_RESTORE_STATE_STORAGE_KEY,
    JSON.stringify({
      href: state.href,
      mode: state.mode,
      pathname: state.pathname,
      top,
    } satisfies ScrollRestoreState),
  )
}

export function resolveHashTargetTop(hash: string) {
  if (typeof window === 'undefined') {
    return null
  }

  if (!hash || hash === HOME_HASH) {
    return 0
  }

  const targetId = decodeURIComponent(hash.slice(1))
  const targetElement = document.getElementById(targetId)

  if (!targetElement) {
    return null
  }

  const headerElement = document.querySelector<HTMLElement>(HEADER_SELECTOR)
  const headerOffset = headerElement?.getBoundingClientRect().height ?? 0
  const targetTop = window.scrollY + targetElement.getBoundingClientRect().top
  return Math.max(0, targetTop - headerOffset - HEADER_GAP_PX)
}

export function getInitialScrollBehavior(currentTop: number, targetTop: number): ScrollBehavior {
  return Math.abs(currentTop - targetTop) > 4 ? 'smooth' : 'auto'
}

export function scrollToHashTarget(hash: string, behavior: ScrollBehavior = 'smooth') {
  const top = resolveHashTargetTop(hash)

  if (top === null || typeof window === 'undefined') {
    return
  }

  scrollToTopPosition(top, behavior)
}

export function scrollToTopPosition(top: number, behavior: ScrollBehavior = 'smooth') {
  if (typeof window === 'undefined') {
    return
  }

  const resolvedTop = Math.max(0, top)

  if (behavior === 'smooth') {
    window.scrollTo({ top: resolvedTop, behavior })
    return
  }

  const rootElement = document.documentElement
  const previousInlineScrollBehavior = rootElement.style.scrollBehavior
  rootElement.style.scrollBehavior = 'auto'
  window.scrollTo({ top: resolvedTop, behavior: 'auto' })
  rootElement.style.scrollBehavior = previousInlineScrollBehavior
}
