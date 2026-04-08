import { companyAdvantages, companyOverview } from '@entities/company'
import './home-about-section.css'

export function HomeAboutSection() {
  return (
    <section id="about" className="home-about">
      <span className="home-about__label">{companyOverview.sectionLabel}</span>
      <h2 className="home-about__title">
        {companyOverview.title}
        <span className="home-about__title-soft">{companyOverview.titleSoft}</span>
      </h2>

      <p className="home-about__description">{companyOverview.description}</p>

      <div className="home-about__grid">
        {companyAdvantages.map((item, index) => (
          <article
            key={item.title}
            className={`home-about__card ${index === 0 ? 'home-about__card--primary' : ''}`}
          >
            <p className="home-about__card-meta">Leader Group</p>
            <p className="home-about__card-title">{item.title}</p>
            <p className="home-about__card-description">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
