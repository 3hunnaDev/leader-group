import './site-header-icon-button.css'

type SiteHeaderIconButtonProps = {
  isActive: boolean
  ariaLabel: string
  ariaExpanded?: boolean
  ariaControls?: string
  onNavigate: () => void
  className?: string
}

export function SiteHeaderIconButton({
  isActive,
  ariaLabel,
  ariaExpanded,
  ariaControls,
  onNavigate,
  className,
}: SiteHeaderIconButtonProps) {
  const classes = ['site-header-icon-button', className].filter(Boolean).join(' ')

  return (
    <button
      type="button"
      onClick={onNavigate}
      className={classes}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
      <span className="burger" aria-hidden="true">
        <input type="checkbox" checked={isActive} readOnly tabIndex={-1} />
        <span />
        <span />
        <span />
      </span>
    </button>
  )
}
