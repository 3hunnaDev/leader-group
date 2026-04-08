import { companyContactSection, companyPhoneNumbers, companySocialLinks } from '@entities/company'
import { contactNavigationItems } from '@shared/config/navigation'
import { HashLink } from '@shared/ui/hash-link'
import './home-contact-section.css'

export function HomeContactSection() {
  return (
    <section id="contacts" className="home-contact">
      <div className="home-contact__grid">
        <div>
          <p className="home-contact__eyebrow">{companyContactSection.eyebrow}</p>
          <h2 className="home-contact__title">{companyContactSection.title}</h2>
          <p className="home-contact__description">{companyContactSection.description}</p>
          <a
            href={companyContactSection.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="home-contact__cta"
          >
            {companyContactSection.ctaLabel}
          </a>
        </div>

        <div className="home-contact__columns">
          <div>
            <p className="home-contact__column-title">{companyContactSection.columnMenuTitle}</p>
            <ul className="home-contact__list home-contact__list--menu">
              {contactNavigationItems.map((item) => (
                <li key={item.href}>
                  <HashLink to={item.href} className="home-contact__link">
                    {item.label}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="home-contact__column-title">
              {companyContactSection.columnContactsTitle}
            </p>
            <ul className="home-contact__list home-contact__list--contacts">
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
      </div>
      <div className="home-contact__bottom">
        <p>{companyContactSection.bottomTitle}</p>
        <p className="home-contact__bottom-text">{companyContactSection.bottomText}</p>
      </div>
    </section>
  )
}
