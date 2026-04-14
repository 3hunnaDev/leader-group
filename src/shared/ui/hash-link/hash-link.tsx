import type { ComponentProps } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  getLocationTarget,
  normalizeHash,
  persistScrollRestoreState,
  resolveHashLinkTarget,
  resolveHashTargetTop,
  scrollToHashTarget,
} from '@shared/lib/hash-navigation'

type HashLinkProps = Omit<ComponentProps<typeof Link>, 'to'> & {
  to: string
  onNavigate?: () => void
}

export function HashLink({ to, onClick, onNavigate, ...props }: HashLinkProps) {
  const location = useLocation()

  const handleClick: ComponentProps<typeof Link>['onClick'] = (event) => {
    onNavigate?.()
    onClick?.(event)

    if (event.defaultPrevented || typeof window === 'undefined') {
      return
    }

    const targetLocation = resolveHashLinkTarget(to, window.location.origin)
    const currentHash = normalizeHash(location.pathname, location.hash)
    const isSameTarget =
      location.pathname === targetLocation.pathname && currentHash === targetLocation.hash
    const isHomeTarget = targetLocation.pathname === '/'

    if (isHomeTarget) {
      persistScrollRestoreState({
        href: getLocationTarget(targetLocation.pathname, targetLocation.hash),
        mode: 'anchor',
        pathname: targetLocation.pathname,
        top:
          location.pathname === targetLocation.pathname
            ? resolveHashTargetTop(targetLocation.hash)
            : null,
      })
    }

    if (!isSameTarget) {
      return
    }

    event.preventDefault()
    scrollToHashTarget(targetLocation.hash)
  }

  return <Link to={to} onClick={handleClick} {...props} />
}
