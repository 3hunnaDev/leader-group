import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

const createMediaQueryList = (query: string): MediaQueryList => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }
}

class ResizeObserverMock implements ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

Object.defineProperty(window, 'matchMedia', {
  configurable: true,
  writable: true,
  value: vi.fn((query: string) => createMediaQueryList(query)),
})

Object.defineProperty(window, 'scrollTo', {
  configurable: true,
  writable: true,
  value: vi.fn(),
})

Object.defineProperty(window, 'requestAnimationFrame', {
  configurable: true,
  writable: true,
  value: (callback: FrameRequestCallback) => {
    return window.setTimeout(() => callback(performance.now()), 16)
  },
})

Object.defineProperty(window, 'cancelAnimationFrame', {
  configurable: true,
  writable: true,
  value: (id: number) => {
    window.clearTimeout(id)
  },
})

Object.defineProperty(window, 'ResizeObserver', {
  configurable: true,
  writable: true,
  value: ResizeObserverMock,
})

if (!('HashChangeEvent' in window)) {
  class HashChangeEventMock extends Event {
    constructor(type: string, eventInitDict?: EventInit) {
      super(type, eventInitDict)
    }
  }

  Object.defineProperty(window, 'HashChangeEvent', {
    configurable: true,
    writable: true,
    value: HashChangeEventMock,
  })
}

afterEach(() => {
  cleanup()
  document.body.style.overflow = ''
  document.body.innerHTML = ''
  document.title = ''
  window.history.pushState({}, '', '/')
  vi.clearAllMocks()
})
