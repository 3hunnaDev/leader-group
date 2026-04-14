import { describe, expect, it } from 'vitest'
import i18n from '@shared/config/i18n'
import { navigationItems } from '@shared/config/navigation'
import { resolvePageTitle } from './resolve-page-title'

describe('resolvePageTitle', () => {
  it('returns the home page title for the root location', () => {
    expect(resolvePageTitle(navigationItems, '/', i18n.getFixedT('en'))).toBe(
      'Home :: Leader Group',
    )
  })

  it('returns the translated page title for Russian locale', () => {
    expect(resolvePageTitle(navigationItems, '/#projects', i18n.getFixedT('ru'))).toBe(
      'Проекты :: Leader Group',
    )
  })

  it('falls back to the base title for unknown routes', () => {
    expect(resolvePageTitle(navigationItems, '/missing', i18n.getFixedT('en'))).toBe('Leader Group')
  })
})
