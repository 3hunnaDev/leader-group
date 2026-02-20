import type { ButtonHTMLAttributes } from 'react'
import styles from './button.module.css'

type ButtonVariant = 'primary' | 'neutral' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

function getClassNames(baseClass: string, additional: Array<string | undefined>): string {
  return [baseClass, ...additional.filter(Boolean)].join(' ')
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  const composedClassName = getClassNames(styles.root, [
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    className,
  ])

  return <button type={type} className={composedClassName} {...props} />
}
