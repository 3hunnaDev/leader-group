const HOME_HASH = '#home'
const HEADER_SELECTOR = '.site-header'
const HEADER_GAP_PX = 12

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

export function scrollToHashTarget(hash: string, behavior: ScrollBehavior = 'smooth') {
  if (typeof window === 'undefined') {
    return
  }

  if (!hash || hash === HOME_HASH) {
    window.scrollTo({ top: 0, behavior })
    return
  }

  const targetId = decodeURIComponent(hash.slice(1))
  const targetElement = document.getElementById(targetId)

  if (!targetElement) {
    return
  }

  const headerElement = document.querySelector<HTMLElement>(HEADER_SELECTOR)
  const headerOffset = headerElement?.getBoundingClientRect().height ?? 0
  const targetTop = window.scrollY + targetElement.getBoundingClientRect().top
  const top = Math.max(0, targetTop - headerOffset - HEADER_GAP_PX)

  window.scrollTo({ top, behavior })
}
