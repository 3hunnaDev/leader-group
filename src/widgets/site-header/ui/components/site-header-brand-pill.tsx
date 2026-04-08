import brandIcon from '@assets/brand-icon.svg'
import { HashLink } from '@shared/ui/hash-link'
import './site-header-brand-pill.css'

type SiteHeaderBrandPillProps = {
  to: string
  onNavigate?: () => void
  className?: string
}

export function SiteHeaderBrandPill({ to, onNavigate, className }: SiteHeaderBrandPillProps) {
  const classes = ['site-header-brand-pill', className].filter(Boolean).join(' ')

  return (
    <HashLink to={to} onNavigate={onNavigate} className={classes}>
      <img
        src={brandIcon}
        alt="Leader Group"
        className="site-header-brand-pill__icon"
        draggable={false}
      />
    </HashLink>
  )
}
