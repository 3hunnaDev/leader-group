import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import brandIcon from '@assets/brand-icon.svg'
import './site-header-brand-pill.css'

type SiteHeaderBrandPillProps = {
  to: string
  onNavigate?: () => void
  className?: string
}

export function SiteHeaderBrandPill({ to, onNavigate, className }: SiteHeaderBrandPillProps) {
  const classes = ['site-header-brand-pill', className].filter(Boolean).join(' ')
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.()

    if (typeof window === 'undefined') {
      return
    }

    const targetUrl = new URL(to, window.location.origin)
    const isHomeTarget = targetUrl.pathname === '/'
    const isSamePath = window.location.pathname === targetUrl.pathname

    if (!isHomeTarget || !isSamePath) {
      return
    }

    event.preventDefault()

    const nextLocation = `${targetUrl.pathname}#home`
    const currentLocation = `${window.location.pathname}${window.location.hash}`

    if (currentLocation !== nextLocation) {
      window.history.pushState(window.history.state, '', nextLocation)
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Link to={to} onClick={handleClick} className={classes}>
      <img
        src={brandIcon}
        alt="Leader Group"
        className="site-header-brand-pill__icon"
        draggable={false}
      />
    </Link>
  )
}
