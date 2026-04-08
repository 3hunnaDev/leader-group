import { HashLink } from '@shared/ui/hash-link'
import './site-header-nav-pill.css'

type SiteHeaderNavPillProps = {
  text: string
  href: string
  onNavigate?: () => void
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

  return (
    <HashLink
      to={href}
      onNavigate={onNavigate}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-current={isCurrent ? 'page' : undefined}
      className={classes}
    >
      {text}
    </HashLink>
  )
}
