import { describe, expect, it } from 'vitest'
import { navigationItems } from '@shared/config/navigation'
import { resolvePageTitle } from './resolve-page-title'

describe('resolvePageTitle', () => {
  it('returns the home page title for the root location', () => {
    expect(resolvePageTitle(navigationItems, '/')).toBe('Home :: Leader Group')
  })

  it('falls back to the base title for unknown routes', () => {
    expect(resolvePageTitle(navigationItems, '/missing')).toBe('Leader Group')
  })
})
