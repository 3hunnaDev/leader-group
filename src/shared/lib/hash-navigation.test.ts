import { describe, expect, it } from 'vitest'
import { getInitialScrollBehavior } from './hash-navigation'

describe('getInitialScrollBehavior', () => {
  it('uses smooth scrolling whenever the initial position is meaningfully away from the target', () => {
    expect(getInitialScrollBehavior(960, 0)).toBe('smooth')
    expect(getInitialScrollBehavior(960, 420)).toBe('smooth')
    expect(getInitialScrollBehavior(0, 420)).toBe('smooth')
  })

  it('keeps the first scroll automatic when the page already starts at the target', () => {
    expect(getInitialScrollBehavior(0, 0)).toBe('auto')
    expect(getInitialScrollBehavior(420, 420)).toBe('auto')
  })
})
