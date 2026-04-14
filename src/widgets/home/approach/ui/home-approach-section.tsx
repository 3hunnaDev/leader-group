import { getCompanyApproachPrinciples, getCompanyApproachSection } from '@entities/company'
import { useTranslation } from 'react-i18next'
import './home-approach-section.css'

export function HomeApproachSection() {
  const { t } = useTranslation()
  const companyApproachSection = getCompanyApproachSection(t)
  const companyApproachPrinciples = getCompanyApproachPrinciples(t)

  return (
    <section id="approach" className="home-approach home-section">
      <div className="home-section__head">
        <div>
          <span className="home-section__eyebrow">{companyApproachSection.sectionLabel}</span>
          <h2 className="home-section__title">
            {companyApproachSection.title}
            <span className="home-section__title-soft">{companyApproachSection.titleSoft}</span>
          </h2>
        </div>
        <p className="home-section__copy">{companyApproachSection.description}</p>
      </div>

      <div className="home-approach__grid">
        {companyApproachPrinciples.map((item) => (
          <article key={item.id} className="home-approach__card">
            <span className="home-card-tag">{item.meta}</span>
            <h3 className="home-approach__card-title">{item.title}</h3>
            <p className="home-approach__card-copy">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
