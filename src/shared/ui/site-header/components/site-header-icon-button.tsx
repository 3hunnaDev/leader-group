import "./site-header-icon-button.css";

type SiteHeaderIconButtonProps = {
  iconSrc: string;
  ariaLabel: string;
  onNavigate: () => void;
  className?: string;
};

export function SiteHeaderIconButton({
  iconSrc,
  ariaLabel,
  onNavigate,
  className,
}: SiteHeaderIconButtonProps) {
  const classes = ["site-header-icon-button", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      onClick={onNavigate}
      className={classes}
      aria-label={ariaLabel}
    >
      <img
        src={iconSrc}
        alt=""
        aria-hidden="true"
        className="site-header-icon-button__icon"
      />
    </button>
  );
}
