import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  appLanguages,
  languageLabels,
  resolveAppLanguage,
  type AppLanguage,
} from '@shared/config/i18n'
import './site-header-locale-switch.css'

type SiteHeaderLocaleSwitchProps = {
  className?: string
}

type ViewTransitionLike = {
  finished: Promise<void>
}

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransitionLike
}

const FALLBACK_TRANSITION_ATTR = 'data-language-transition'
const FALLBACK_FADE_OUT_MS = 120
const FALLBACK_SETTLE_MS = 280

function waitForMs(durationMs: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, durationMs)
  })
}

function waitForNextFrame() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })
}

export function SiteHeaderLocaleSwitch({ className }: SiteHeaderLocaleSwitchProps) {
  const { i18n, t } = useTranslation()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const activeLanguage = resolveAppLanguage(i18n.resolvedLanguage)
  const classes = ['site-header-locale-switch', className].filter(Boolean).join(' ')

  const handleLanguageChange = async (language: AppLanguage) => {
    if (language === activeLanguage || isTransitioning) {
      return
    }

    setIsTransitioning(true)

    try {
      const documentWithViewTransition = document as DocumentWithViewTransition

      if (documentWithViewTransition.startViewTransition) {
        const transition = documentWithViewTransition.startViewTransition(() => {
          return i18n.changeLanguage(language)
        })

        await transition.finished.catch(() => undefined)
        return
      }

      document.documentElement.setAttribute(FALLBACK_TRANSITION_ATTR, 'true')
      await waitForMs(FALLBACK_FADE_OUT_MS)
      await i18n.changeLanguage(language)
      await waitForNextFrame()
      await waitForNextFrame()
      document.documentElement.removeAttribute(FALLBACK_TRANSITION_ATTR)
      await waitForMs(FALLBACK_SETTLE_MS)
    } finally {
      document.documentElement.removeAttribute(FALLBACK_TRANSITION_ATTR)
      setIsTransitioning(false)
    }
  }

  return (
    <div
      className={classes}
      data-transitioning={isTransitioning ? 'true' : 'false'}
      role="group"
      aria-label={t('languageSwitcher.ariaLabel')}
      aria-busy={isTransitioning}
    >
      {appLanguages.map((language) => {
        const isActive = language === activeLanguage

        return (
          <button
            key={language}
            type="button"
            data-language={language}
            className={`site-header-locale-switch__button ${
              isActive ? 'site-header-locale-switch__button--active' : ''
            }`}
            aria-pressed={isActive}
            disabled={isTransitioning}
            onClick={() => {
              void handleLanguageChange(language)
            }}
          >
            {languageLabels[language]}
          </button>
        )
      })}
    </div>
  )
}
