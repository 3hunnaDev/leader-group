import closeIcon from '@assets/icons/Menu/Close_MD.svg'
import hamburgerIcon from '@assets/icons/Menu/Hamburger_MD.svg'
import type { NavigationItem } from '@shared/config/navigation'
import { Modal } from '@shared/ui/modal'
import { SiteHeaderBrandPill } from './site-header-brand-pill'
import { SiteHeaderIconButton } from './site-header-icon-button'
import { SiteHeaderNavPill } from './site-header-nav-pill'

type SiteHeaderMobileProps = {
  navigationItems: NavigationItem[]
  activeHref: string | null
  onNavigate: (href: string) => void
  isMenuOpen: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
}

export function SiteHeaderMobile({
  navigationItems,
  activeHref,
  onNavigate,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
}: SiteHeaderMobileProps) {
  const mobileMenuContentId = 'site-header-mobile-menu'

  const handleItemNavigate = (href: string) => {
    onNavigate(href)
    onCloseMenu()
  }

  return (
    <div className="site-header-mobile">
      <div
        className={`site-header-mobile__row ${
          isMenuOpen ? 'site-header-mobile__row--menu-open' : ''
        }`}
      >
        <SiteHeaderBrandPill to="/" onNavigate={onCloseMenu} />

        <SiteHeaderIconButton
          iconSrc={isMenuOpen ? closeIcon : hamburgerIcon}
          ariaLabel={isMenuOpen ? 'Close navigation' : 'Open navigation'}
          ariaExpanded={isMenuOpen}
          ariaControls={mobileMenuContentId}
          onNavigate={onToggleMenu}
        />
      </div>

      <Modal
        isOpen={isMenuOpen}
        onClose={onCloseMenu}
        overlayClassName="site-header-mobile__modal-overlay"
        contentClassName="site-header-mobile__modal-content"
        contentId={mobileMenuContentId}
        ariaLabel="Navigation menu"
        closeAnimationDurationMs={420}
      >
        <div className="site-header-mobile__panel">
          <nav className="site-header-mobile__nav" aria-label="Site navigation">
            {navigationItems.map((item) => (
              <SiteHeaderNavPill
                key={item.href}
                text={item.label}
                href={item.href}
                onNavigate={handleItemNavigate}
                isCurrent={activeHref === item.href}
                className={`site-header-nav-pill--mobile site-header-nav-pill--nav ${
                  activeHref === item.href ? 'site-header-nav-pill--active' : ''
                }`}
              />
            ))}
          </nav>
        </div>
      </Modal>

      <div className="site-header-mobile__fixed-cta-shell">
        <SiteHeaderNavPill
          text="Оставить заявку"
          href="/#contacts"
          onNavigate={handleItemNavigate}
          className="site-header-nav-pill--cta site-header-mobile__fixed-cta"
        />
      </div>
    </div>
  )
}
