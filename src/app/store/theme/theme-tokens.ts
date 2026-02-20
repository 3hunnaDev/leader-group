type ThemeValue = string | number

export interface ThemeTokens {
  colors: {
    ink: string
    steel: string
    graphite: string
    cloud: string
    mist: string
    white: string
  }
  spacing: {
    xxs: string
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  typography: {
    fontFamily: {
      base: string
      display: string
    }
    fontSize: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
    fontWeight: {
      regular: number
      medium: number
      semibold: number
      bold: number
    }
    lineHeight: {
      tight: number
      base: number
      relaxed: number
    }
  }
  breakpoints: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  container: {
    maxWidth: string
    paddingXMobile: string
    paddingXDesktop: string
  }
  radius: {
    sm: string
    md: string
    lg: string
    xl: string
    pill: string
  }
  shadows: {
    soft: string
    medium: string
    button: string
  }
  blur: {
    soft: string
    medium: string
  }
  transition: {
    fast: string
    base: string
  }
  button: {
    paddingY: string
    paddingX: string
    primary: {
      background: string
      text: string
      hoverBackground: string
    }
    neutral: {
      background: string
      text: string
      hoverBackground: string
    }
    ghost: {
      background: string
      text: string
      border: string
      hoverBackground: string
    }
  }
  pill: {
    paddingY: string
    paddingX: string
    base: {
      background: string
      text: string
    }
    active: {
      background: string
      text: string
    }
    hover: {
      background: string
      text: string
    }
  }
  image: {
    border: string
    overlay: string
  }
  focusRing: string
}

export const themeTokens: ThemeTokens = {
  colors: {
    ink: 'rgb(43 42 48)',
    steel: 'rgb(224 226 229)',
    graphite: 'rgb(163 166 169)',
    cloud: 'rgb(243 243 243)',
    mist: 'rgb(248 249 253)',
    white: 'rgb(255 255 255)',
  },
  spacing: {
    xxs: '0.25rem',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: {
      base: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
      display: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.5rem',
      xxl: '2rem',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      base: 1.5,
      relaxed: 1.7,
    },
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  container: {
    maxWidth: '1280px',
    paddingXMobile: '1rem',
    paddingXDesktop: '1.5rem',
  },
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    pill: '999px',
  },
  shadows: {
    soft: '0 8px 24px rgb(43 42 48 / 8%)',
    medium: '0 10px 30px rgb(43 42 48 / 14%)',
    button: '0 6px 20px rgb(43 42 48 / 22%)',
  },
  blur: {
    soft: '4px',
    medium: '10px',
  },
  transition: {
    fast: '120ms ease-in-out',
    base: '180ms ease-in-out',
  },
  button: {
    paddingY: '1.125rem',
    paddingX: '2.75rem',
    primary: {
      background: 'rgb(43 42 48)',
      text: 'rgb(255 255 255)',
      hoverBackground: 'rgb(33 32 38)',
    },
    neutral: {
      background: 'rgb(224 226 229)',
      text: 'rgb(43 42 48)',
      hoverBackground: 'rgb(209 212 216)',
    },
    ghost: {
      background: 'transparent',
      text: 'rgb(43 42 48)',
      border: 'rgb(224 226 229)',
      hoverBackground: 'rgb(243 243 243)',
    },
  },
  pill: {
    paddingY: '1.5rem',
    paddingX: '1.8rem',
    base: {
      background: 'transparent',
      text: 'rgb(43 42 48)',
    },
    active: {
      background: 'rgb(197 200 204)',
      text: 'rgb(248 249 253)',
    },
    hover: {
      background: 'rgb(197 200 204)',
      text: 'rgb(248 249 253)',
    },
  },
  image: {
    border: '1px solid rgb(224 226 229)',
    overlay: 'linear-gradient(180deg, rgb(43 42 48 / 6%), rgb(43 42 48 / 16%))',
  },
  focusRing: '0 0 0 3px rgb(43 42 48 / 20%)',
}

function toCssValue(value: ThemeValue): string {
  return String(value)
}

export function createThemeCssVariables(tokens: ThemeTokens): Record<string, string> {
  return {
    '--color-ink': toCssValue(tokens.colors.ink),
    '--color-steel': toCssValue(tokens.colors.steel),
    '--color-graphite': toCssValue(tokens.colors.graphite),
    '--color-cloud': toCssValue(tokens.colors.cloud),
    '--color-mist': toCssValue(tokens.colors.mist),
    '--color-white': toCssValue(tokens.colors.white),
    '--font-family-base': toCssValue(tokens.typography.fontFamily.base),
    '--font-family-display': toCssValue(tokens.typography.fontFamily.display),
    '--font-size-xs': toCssValue(tokens.typography.fontSize.xs),
    '--font-size-sm': toCssValue(tokens.typography.fontSize.sm),
    '--font-size-md': toCssValue(tokens.typography.fontSize.md),
    '--font-size-lg': toCssValue(tokens.typography.fontSize.lg),
    '--font-size-xl': toCssValue(tokens.typography.fontSize.xl),
    '--font-size-xxl': toCssValue(tokens.typography.fontSize.xxl),
    '--font-weight-regular': toCssValue(tokens.typography.fontWeight.regular),
    '--font-weight-medium': toCssValue(tokens.typography.fontWeight.medium),
    '--font-weight-semibold': toCssValue(tokens.typography.fontWeight.semibold),
    '--font-weight-bold': toCssValue(tokens.typography.fontWeight.bold),
    '--line-height-tight': toCssValue(tokens.typography.lineHeight.tight),
    '--line-height-base': toCssValue(tokens.typography.lineHeight.base),
    '--line-height-relaxed': toCssValue(tokens.typography.lineHeight.relaxed),
    '--breakpoint-sm': toCssValue(tokens.breakpoints.sm),
    '--breakpoint-md': toCssValue(tokens.breakpoints.md),
    '--breakpoint-lg': toCssValue(tokens.breakpoints.lg),
    '--breakpoint-xl': toCssValue(tokens.breakpoints.xl),
    '--container-max-width': toCssValue(tokens.container.maxWidth),
    '--container-padding-x-mobile': toCssValue(tokens.container.paddingXMobile),
    '--container-padding-x-desktop': toCssValue(tokens.container.paddingXDesktop),
    '--app-text-primary': toCssValue(tokens.colors.ink),
    '--app-text-secondary': toCssValue(tokens.colors.graphite),
    '--app-background-color': toCssValue(tokens.colors.mist),
    '--app-surface-color': toCssValue(tokens.colors.cloud),
    '--app-border-color': toCssValue(tokens.colors.steel),
    '--app-border-color-strong': toCssValue(tokens.colors.graphite),
    '--space-xxs': toCssValue(tokens.spacing.xxs),
    '--space-xs': toCssValue(tokens.spacing.xs),
    '--space-sm': toCssValue(tokens.spacing.sm),
    '--space-md': toCssValue(tokens.spacing.md),
    '--space-lg': toCssValue(tokens.spacing.lg),
    '--space-xl': toCssValue(tokens.spacing.xl),
    '--radius-sm': toCssValue(tokens.radius.sm),
    '--radius-md': toCssValue(tokens.radius.md),
    '--radius-lg': toCssValue(tokens.radius.lg),
    '--radius-xl': toCssValue(tokens.radius.xl),
    '--radius-pill': toCssValue(tokens.radius.pill),
    '--pill-padding-y': toCssValue(tokens.pill.paddingY),
    '--pill-padding-x': toCssValue(tokens.pill.paddingX),
    '--pill-base-bg': toCssValue(tokens.pill.base.background),
    '--pill-base-text': toCssValue(tokens.pill.base.text),
    '--pill-active-bg': toCssValue(tokens.pill.active.background),
    '--pill-active-text': toCssValue(tokens.pill.active.text),
    '--pill-hover-bg': toCssValue(tokens.pill.hover.background),
    '--button-padding-y': toCssValue(tokens.button.paddingY),
    '--button-padding-x': toCssValue(tokens.button.paddingX),
    '--button-primary-bg': toCssValue(tokens.button.primary.background),
    '--button-primary-bg-hover': toCssValue(tokens.button.primary.hoverBackground),
    '--button-primary-text': toCssValue(tokens.button.primary.text),
    '--button-neutral-bg': toCssValue(tokens.button.neutral.background),
    '--button-neutral-bg-hover': toCssValue(tokens.button.neutral.hoverBackground),
    '--button-neutral-text': toCssValue(tokens.button.neutral.text),
    '--button-ghost-bg': toCssValue(tokens.button.ghost.background),
    '--button-ghost-bg-hover': toCssValue(tokens.button.ghost.hoverBackground),
    '--button-ghost-text': toCssValue(tokens.button.ghost.text),
    '--button-ghost-border': toCssValue(tokens.button.ghost.border),
    '--shadow-soft': toCssValue(tokens.shadows.soft),
    '--shadow-medium': toCssValue(tokens.shadows.medium),
    '--shadow-button': toCssValue(tokens.shadows.button),
    '--blur-soft': toCssValue(tokens.blur.soft),
    '--blur-medium': toCssValue(tokens.blur.medium),
    '--transition-fast': toCssValue(tokens.transition.fast),
    '--transition-base': toCssValue(tokens.transition.base),
    '--image-overlay': toCssValue(tokens.image.overlay),
    '--image-border': toCssValue(tokens.image.border),
    '--focus-ring': toCssValue(tokens.focusRing),
  }
}

export function applyThemeTokensToDocument(tokens: ThemeTokens): void {
  if (typeof document === 'undefined') {
    return
  }

  const cssVariables = createThemeCssVariables(tokens)
  const rootStyle = document.documentElement.style

  Object.entries(cssVariables).forEach(([key, value]) => {
    rootStyle.setProperty(key, value)
  })
}
