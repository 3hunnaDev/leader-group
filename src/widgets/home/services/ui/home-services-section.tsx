import { serviceCatalogSection, serviceOfferings } from '@entities/service'
import { HashLink } from '@shared/ui/hash-link'
import './home-services-section.css'

export function HomeServicesSection() {
  return (
    <section id="assortment" className="home-services">
      <div className="home-services__intro">
        <span className="home-services__label">{serviceCatalogSection.sectionLabel}</span>
        <h2 className="home-services__title">{serviceCatalogSection.title}</h2>
      </div>

      <div className="home-services__cards-grid">
        {serviceOfferings.map((item) => (
          <article key={item.title} className="home-services__card">
            <p className="home-services__card-meta">Leader Group</p>
            <h3 className="home-services__card-title">{item.title}</h3>
            <p className="home-services__card-description">{item.description}</p>
            <HashLink to="/#contacts" className="home-services__card-link">
              Подробнее
            </HashLink>
          </article>
        ))}
      </div>

      <div className="home-services__catalog">
        <p className="home-services__catalog-meta">{serviceCatalogSection.catalogMeta}</p>
        <p className="home-services__catalog-title">{serviceCatalogSection.catalogTitle}</p>
        <HashLink to="/#contacts" className="home-services__catalog-link">
          {serviceCatalogSection.catalogLinkText}
        </HashLink>
      </div>
    </section>
  )
}
