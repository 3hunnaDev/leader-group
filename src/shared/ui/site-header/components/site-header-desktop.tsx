import { useEffect, useState } from "react";
import type { NavigationItem } from "../../../config/navigation/navigation-items";
import { SiteHeaderBrandPill } from "./site-header-brand-pill";
import { SiteHeaderNavPill } from "./site-header-nav-pill";

type SiteHeaderDesktopProps = {
  navigationItems: NavigationItem[];
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

export function SiteHeaderDesktop({ navigationItems }: SiteHeaderDesktopProps) {
  const [activeHref, setActiveHref] = useState(() =>
    getActiveHref(navigationItems),
  );
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

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

  return (
    <div className="site-header-desktop">
      <div className="site-header-desktop__shell">
        <div className="site-header-desktop__row">
          <SiteHeaderBrandPill to="/" />

          <div className="site-header-desktop__nav-shell">
            <nav
              className="site-header-desktop__nav"
              onMouseLeave={() => setHoveredHref(null)}
            >
              {navigationItems.map((item) => {
                const isActive = activeHref === item.href;
                const isHoverPreview = hoveredHref === item.href;
                const shouldDisplayAsActive = hoveredHref
                  ? isHoverPreview
                  : isActive;
                const activeClass = shouldDisplayAsActive
                  ? "site-header-nav-pill--active"
                  : "";

                return (
                  <SiteHeaderNavPill
                    key={item.href}
                    text={item.label}
                    href={item.href}
                    onNavigate={setActiveHref}
                    onMouseEnter={() => setHoveredHref(item.href)}
                    className={`site-header-nav-pill--nav ${activeClass}`}
                  />
                );
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
  );
}
