import { Link } from 'react-router-dom'
import {
  homeContactMenuItems,
  homeContactPhones,
  homeContactSectionContent,
  homeContactSocialLinks,
} from '../model/contact-content'

export function HomeContactSection() {
  return (
    <section id="contacts" className="home-contact">
      <div className="home-contact__grid">
        <div>
          <p className="home-contact__eyebrow">{homeContactSectionContent.eyebrow}</p>
          <h2 className="home-contact__title">{homeContactSectionContent.title}</h2>
          <p className="home-contact__description">{homeContactSectionContent.description}</p>
          <a
            href={homeContactSectionContent.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="home-contact__cta"
          >
            {homeContactSectionContent.ctaLabel}
          </a>
        </div>

        <div className="home-contact__columns">
          <div>
            <p className="home-contact__column-title">
              {homeContactSectionContent.columnMenuTitle}
            </p>
            <ul className="home-contact__list home-contact__list--menu">
              {homeContactMenuItems.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="home-contact__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="home-contact__column-title">
              {homeContactSectionContent.columnContactsTitle}
            </p>
            <ul className="home-contact__list home-contact__list--contacts">
              {homeContactPhones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="home-contact__link">
                    {phone}
                  </a>
                </li>
              ))}
              {homeContactSocialLinks.map((socialLink) => (
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
        <p>{homeContactSectionContent.bottomTitle}</p>
        <p className="home-contact__bottom-text">{homeContactSectionContent.bottomText}</p>
      </div>
    </section>
  )
}
