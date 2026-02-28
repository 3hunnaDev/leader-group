import { useEffect, useState } from "react";
import closeIcon from "../../../../assets/icons/Menu/Close_MD.svg";
import hamburgerIcon from "../../../../assets/icons/Menu/Hamburger_MD.svg";
import type { NavigationItem } from "../../../config/navigation/navigation-items";
import { Modal } from "../../modal";
import { SiteHeaderBrandPill } from "./site-header-brand-pill";
import { SiteHeaderIconButton } from "./site-header-icon-button";
import { SiteHeaderNavPill } from "./site-header-nav-pill";

type SiteHeaderMobileProps = {
  navigationItems: NavigationItem[];
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

const DEFAULT_ACTIVE_HREF = "/#home";

function getActiveHref(items: NavigationItem[]) {
  if (typeof window === "undefined") {
    return DEFAULT_ACTIVE_HREF;
  }

  const locationTarget = `${window.location.pathname}${window.location.hash}`;
  const matchedItem = items.find((item) => item.href === locationTarget);

  return matchedItem?.href ?? DEFAULT_ACTIVE_HREF;
}

export function SiteHeaderMobile({
  navigationItems,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
}: SiteHeaderMobileProps) {
  const [activeHref, setActiveHref] = useState(() =>
    getActiveHref(navigationItems),
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setActiveHref(getActiveHref(navigationItems));
    };

    window.addEventListener("hashchange", handleLocationChange);
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("hashchange", handleLocationChange);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, [navigationItems]);

  const handleItemNavigate = (href: string) => {
    setActiveHref(href);
    onCloseMenu();
  };

  return (
    <div className="site-header-mobile">
      <div
        className={`site-header-mobile__row ${
          isMenuOpen ? "site-header-mobile__row--menu-open" : ""
        }`}
      >
        <SiteHeaderBrandPill to="/" />

        <SiteHeaderIconButton
          iconSrc={isMenuOpen ? closeIcon : hamburgerIcon}
          ariaLabel={isMenuOpen ? "Close navigation" : "Open navigation"}
          onNavigate={onToggleMenu}
        />
      </div>

      <Modal
        isOpen={isMenuOpen}
        onClose={onCloseMenu}
        overlayClassName="site-header-mobile__modal-overlay"
        contentClassName="site-header-mobile__modal-content"
        closeAnimationDurationMs={420}
      >
        <div className="site-header-mobile__panel">
          <nav className="site-header-mobile__nav">
            {navigationItems.map((item) => (
              <SiteHeaderNavPill
                key={item.href}
                text={item.label}
                href={item.href}
                onNavigate={handleItemNavigate}
                className={`site-header-nav-pill--mobile site-header-nav-pill--nav ${
                  activeHref === item.href ? "site-header-nav-pill--active" : ""
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
  );
}
