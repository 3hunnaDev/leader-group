type SiteHeaderIconButtonProps = {
  iconSrc: string
  ariaLabel: string
  ariaExpanded?: boolean
  ariaControls?: string
  onNavigate: () => void
  className?: string
}

export function SiteHeaderIconButton({
  iconSrc,
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
      <img src={iconSrc} alt="" aria-hidden="true" className="site-header-icon-button__icon" />
    </button>
  )
}
