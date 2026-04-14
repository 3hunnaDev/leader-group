import {
  getCompanyContactSection,
  companyPhoneNumbers,
  getCompanySocialLinks,
} from '@entities/company'
import { contactNavigationItems } from '@shared/config/navigation'
import { HashLink } from '@shared/ui/hash-link'
import { useTranslation } from 'react-i18next'
import './home-contact-section.css'

export function HomeContactSection() {
  const { t } = useTranslation()
  const companyContactSection = getCompanyContactSection(t)
  const companySocialLinks = getCompanySocialLinks(t)

  return (
    <footer id="contact" className="home-contact home-section" data-header-tone="dark">
      <div className="home-contact__inner">
        <div className="home-contact__head">
          <div>
            <span className="home-section__eyebrow home-contact__eyebrow">
              {companyContactSection.eyebrow}
            </span>
            <h2 className="home-contact__title">{companyContactSection.title}</h2>
            <p className="home-contact__copy">{companyContactSection.description}</p>
          </div>
          <a
            href={companyContactSection.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="home-button home-button--light home-contact__cta"
          >
            {companyContactSection.ctaLabel}
          </a>
        </div>

        <div className="home-contact__grid">
          <div className="home-contact__column">
            <p className="home-contact__column-title">{companyContactSection.narrativeTitle}</p>
            <p className="home-contact__narrative">{companyContactSection.narrative}</p>
          </div>

          <div className="home-contact__column">
            <p className="home-contact__column-title">{companyContactSection.columnMenuTitle}</p>
            <ul className="home-contact__list">
              {contactNavigationItems.map((item) => (
                <li key={item.href}>
                  <HashLink to={item.href} className="home-contact__link">
                    {t(item.labelKey)}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="home-contact__column">
            <p className="home-contact__column-title">
              {companyContactSection.columnContactsTitle}
            </p>
            <ul className="home-contact__list">
              {companyPhoneNumbers.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="home-contact__link">
                    {phone}
                  </a>
                </li>
              ))}
              {companySocialLinks.map((socialLink) => (
                <li key={socialLink.href}>
                  <a
                    href={socialLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-contact__link"
                  >
                    {socialLink.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="home-contact__bottom">
          <p>{companyContactSection.bottomTitle}</p>
          <p className="home-contact__bottom-text">{companyContactSection.bottomText}</p>
        </div>
      </div>
    </footer>
  )
}
