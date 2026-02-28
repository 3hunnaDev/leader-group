import { useEffect, useRef, useState } from "react";
import { navigationItems } from "../../config/navigation/navigation-items";
import { SiteHeaderDesktop } from "./components/site-header-desktop";
import { SiteHeaderMobile } from "./components/site-header-mobile";
import "./site-header.css";

const BASE_TITLE = "Leader Group";

function getCurrentSectionTitle() {
  if (typeof window === "undefined") {
    return BASE_TITLE;
  }

  const locationTarget = `${window.location.pathname}${window.location.hash}`;
  const currentItem = navigationItems.find(
    (item) => item.href === locationTarget,
  );
  const homeItem = navigationItems.find((item) => item.href === "/#home");
  const sectionLabel = currentItem?.label ?? homeItem?.label;

  return sectionLabel ? `${sectionLabel} :: ${BASE_TITLE}` : BASE_TITLE;
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const handleDesktopMode = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    desktopQuery.addEventListener("change", handleDesktopMode);

    return () => {
      desktopQuery.removeEventListener("change", handleDesktopMode);
    };
  }, []);

  useEffect(() => {
    const headerElement = headerRef.current;

    if (!headerElement) {
      return;
    }

    let frameId = 0;

    const updateHeaderTone = () => {
      const headerRect = headerElement.getBoundingClientRect();
      const darkZones = document.querySelectorAll<HTMLElement>(
        "[data-header-tone='dark']",
      );

      const isOnDarkZone = Array.from(darkZones).some((zone) => {
        const zoneRect = zone.getBoundingClientRect();

        return (
          zoneRect.bottom > headerRect.top && zoneRect.top < headerRect.bottom
        );
      });

      headerElement.classList.toggle("site-header--on-dark", isOnDarkZone);
    };

    const scheduleHeaderToneUpdate = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(updateHeaderTone);
    };

    scheduleHeaderToneUpdate();

    window.addEventListener("scroll", scheduleHeaderToneUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleHeaderToneUpdate);
    window.addEventListener("load", scheduleHeaderToneUpdate);
    window.addEventListener("hashchange", scheduleHeaderToneUpdate);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleHeaderToneUpdate);
      window.removeEventListener("resize", scheduleHeaderToneUpdate);
      window.removeEventListener("load", scheduleHeaderToneUpdate);
      window.removeEventListener("hashchange", scheduleHeaderToneUpdate);
    };
  }, []);

  useEffect(() => {
    const updatePageTitle = () => {
      document.title = getCurrentSectionTitle();
    };

    updatePageTitle();
    window.addEventListener("hashchange", updatePageTitle);
    window.addEventListener("popstate", updatePageTitle);

    return () => {
      window.removeEventListener("hashchange", updatePageTitle);
      window.removeEventListener("popstate", updatePageTitle);
    };
  }, []);

  return (
    <header ref={headerRef} className="site-header">
      <SiteHeaderMobile
        navigationItems={navigationItems}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((state) => !state)}
        onCloseMenu={() => setIsMenuOpen(false)}
      />
      <SiteHeaderDesktop navigationItems={navigationItems} />
    </header>
  );
}
