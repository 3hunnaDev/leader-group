import { serviceCatalogSection, serviceOfferings } from '@entities/service'
import { MediaPlaceholder } from '@shared/ui/media-placeholder'
import './home-services-section.css'

export function HomeServicesSection() {
  return (
    <section id="solutions" className="home-services home-section">
      <div className="home-section__head">
        <div>
          <span className="home-section__eyebrow">{serviceCatalogSection.sectionLabel}</span>
          <h2 className="home-section__title">
            {serviceCatalogSection.title}
            <span className="home-section__title-soft">{serviceCatalogSection.titleSoft}</span>
          </h2>
        </div>
        <p className="home-section__copy">{serviceCatalogSection.description}</p>
      </div>

      <div className="home-services__grid">
        {serviceOfferings.map((item) => (
          <article key={item.title} className="home-services__card">
            <MediaPlaceholder label="Service image / 4:3" className="home-services__media" />
            <span className="home-card-tag">{item.meta}</span>
            <h3 className="home-services__card-title">{item.title}</h3>
            <p className="home-services__card-copy">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
