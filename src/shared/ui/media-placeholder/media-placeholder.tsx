import './media-placeholder.css'

type MediaPlaceholderProps = {
  className?: string
  label: string
}

export function MediaPlaceholder({ className, label }: MediaPlaceholderProps) {
  const classes = ['media-placeholder', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <span className="media-placeholder__label">{label}</span>
    </div>
  )
}
