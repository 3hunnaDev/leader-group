import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'

type SiteHeaderNavPillProps = {
  text: string
  href: string
  onNavigate?: (href: string) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  isCurrent?: boolean
  className?: string
}

export function SiteHeaderNavPill({
  text,
  href,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
  isCurrent,
  className,
}: SiteHeaderNavPillProps) {
  const classes = ['site-header-nav-pill', className].filter(Boolean).join(' ')

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.(href)

    if (typeof window === 'undefined') {
      return
    }

    const targetUrl = new URL(href, window.location.origin)
    const isHomeTarget = targetUrl.hash === '#home'
    const isSamePath = window.location.pathname === targetUrl.pathname

    if (!isHomeTarget || !isSamePath) {
      return
    }

    event.preventDefault()

    const nextLocation = `${targetUrl.pathname}${targetUrl.hash}`
    const currentLocation = `${window.location.pathname}${window.location.hash}`

    if (currentLocation !== nextLocation) {
      window.history.pushState(window.history.state, '', nextLocation)
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Link
      to={href}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-current={isCurrent ? 'page' : undefined}
      className={classes}
    >
      {text}
    </Link>
  )
}
