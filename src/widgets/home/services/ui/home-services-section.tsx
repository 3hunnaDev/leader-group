import { Link } from 'react-router-dom'
import { homeServiceItems, homeServicesSectionContent } from '../model/services-content'

export function HomeServicesSection() {
  return (
    <section id="assortment" className="home-services">
      <div className="home-services__intro">
        <span className="home-services__label">{homeServicesSectionContent.label}</span>
        <h2 className="home-services__title">{homeServicesSectionContent.title}</h2>
      </div>

      <div className="home-services__cards-grid">
        {homeServiceItems.map((item) => (
          <article key={item.title} className="home-services__card">
            <p className="home-services__card-meta">Leader Group</p>
            <h3 className="home-services__card-title">{item.title}</h3>
            <p className="home-services__card-description">{item.description}</p>
            <Link to="/#contacts" className="home-services__card-link">
              Подробнее
            </Link>
          </article>
        ))}
      </div>

      <div className="home-services__catalog">
        <p className="home-services__catalog-meta">{homeServicesSectionContent.catalogMeta}</p>
        <p className="home-services__catalog-title">{homeServicesSectionContent.catalogTitle}</p>
        <Link to="/#contacts" className="home-services__catalog-link">
          {homeServicesSectionContent.catalogLinkText}
        </Link>
      </div>
    </section>
  )
}
