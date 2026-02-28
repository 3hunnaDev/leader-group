import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../../assets/icons/Menu/Close_MD.svg";
import hamburgerIcon from "../../../assets/icons/Menu/Hamburger_MD.svg";
import { navigationItems } from "../../config/navigation/navigation-items";
import "./site-header.css";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="site-header__shell">
        <div className="site-header__row">
          <Link to="/" className="site-header__brand">
            <img
              src="https://static.tildacdn.com/tild3333-3430-4535-b536-656535633033/Group_1771.svg"
              alt="Leader Group"
              className="site-header__logo"
            />
            <div className="site-header__brand-text">
              <p className="site-header__brand-line">Leader</p>
              <p className="site-header__brand-line">Group</p>
            </div>
          </Link>

          <nav className="site-header__nav">
            {navigationItems.map((item) => {
              const isPrimaryItem = item.href === "/#home";

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`site-header__nav-link ${
                    isPrimaryItem ? "site-header__nav-link--active" : ""
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="site-header__cta-wrap">
            <a href="/#contacts" className="site-header__cta">
              Оставить заявку
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((state) => !state)}
            className="site-header__menu-btn"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <img
              src={isMenuOpen ? closeIcon : hamburgerIcon}
              alt=""
              aria-hidden="true"
              className="site-header__menu-icon"
            />
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="site-header__mobile-overlay">
          <div className="site-header__mobile-panel">
            <nav className="site-header__mobile-nav">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="site-header__mobile-link"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href="/#contacts"
              onClick={() => setIsMenuOpen(false)}
              className="site-header__mobile-cta"
            >
              Оставить заявку
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
