import { useState } from 'react'
import type { NavigationItem } from '@shared/config/navigation'
import { SiteHeaderBrandPill } from './site-header-brand-pill'
import { SiteHeaderNavPill } from './site-header-nav-pill'

type SiteHeaderDesktopProps = {
  navigationItems: NavigationItem[]
  activeHref: string | null
}

export function SiteHeaderDesktop({ navigationItems, activeHref }: SiteHeaderDesktopProps) {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)

  return (
    <div className="site-header-desktop">
      <div className="site-header-desktop__shell">
        <div className="site-header-desktop__row">
          <SiteHeaderBrandPill to="/" />

          <div className="site-header-desktop__nav-shell">
            <nav className="site-header-desktop__nav" onMouseLeave={() => setHoveredHref(null)}>
              {navigationItems.map((item) => {
                const isActive = activeHref === item.href
                const isHoverPreview = hoveredHref === item.href
                const shouldDisplayAsActive = hoveredHref ? isHoverPreview : isActive
                const activeClass = shouldDisplayAsActive ? 'site-header-nav-pill--active' : ''

                return (
                  <SiteHeaderNavPill
                    key={item.href}
                    text={item.label}
                    href={item.href}
                    onMouseEnter={() => setHoveredHref(item.href)}
                    isCurrent={isActive}
                    className={`site-header-nav-pill--nav ${activeClass}`}
                  />
                )
              })}
            </nav>
          </div>

          <SiteHeaderNavPill
            text="Оставить заявку"
            href="/#contacts"
            className="site-header-nav-pill--cta site-header-desktop__cta"
          />
        </div>
      </div>
    </div>
  )
}
