import type { Ref } from 'react'
import { useTranslation } from 'react-i18next'
import type { NavigationItem } from '@shared/config/navigation'
import { Modal } from '@shared/ui/modal'
import { SiteHeaderBrandPill } from './site-header-brand-pill'
import { SiteHeaderIconButton } from './site-header-icon-button'
import { SiteHeaderLocaleSwitch } from './site-header-locale-switch'
import { SiteHeaderNavPill } from './site-header-nav-pill'

type SiteHeaderMobileProps = {
  navigationItems: NavigationItem[]
  activeHref: string | null
  isMenuOpen: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
  rootRef?: Ref<HTMLDivElement>
}

export function SiteHeaderMobile({
  navigationItems,
  activeHref,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  rootRef,
}: SiteHeaderMobileProps) {
  const { t } = useTranslation()
  const mobileMenuContentId = 'site-header-mobile-menu'

  return (
    <div ref={rootRef} className="site-header-mobile">
      <div
        className={`site-header-mobile__row ${
          isMenuOpen ? 'site-header-mobile__row--menu-open' : ''
        }`}
      >
        <SiteHeaderBrandPill to="/" onNavigate={onCloseMenu} />

        <div className="site-header-mobile__actions">
          <SiteHeaderLocaleSwitch />
          <SiteHeaderIconButton
            isActive={isMenuOpen}
            ariaLabel={isMenuOpen ? t('header.menu.close') : t('header.menu.open')}
            ariaExpanded={isMenuOpen}
            ariaControls={mobileMenuContentId}
            onNavigate={onToggleMenu}
          />
        </div>
      </div>

      <Modal
        isOpen={isMenuOpen}
        onClose={onCloseMenu}
        overlayClassName="site-header-mobile__modal-overlay"
        contentClassName="site-header-mobile__modal-content"
        contentId={mobileMenuContentId}
        ariaLabel={t('header.menu.dialogLabel')}
        closeAnimationDurationMs={420}
      >
        <div className="site-header-mobile__panel">
          <nav className="site-header-mobile__nav" aria-label={t('header.menu.navigationLabel')}>
            {navigationItems.map((item) => (
              <SiteHeaderNavPill
                key={item.href}
                text={t(item.labelKey)}
                href={item.href}
                onNavigate={onCloseMenu}
                isCurrent={activeHref === item.href}
                className={`site-header-nav-pill--mobile site-header-nav-pill--nav ${
                  activeHref === item.href ? 'site-header-nav-pill--active' : ''
                }`}
              />
            ))}
          </nav>
        </div>
      </Modal>
    </div>
  )
}
