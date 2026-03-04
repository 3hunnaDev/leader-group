import { homeAboutSectionContent, homeAdvantages } from '../model/about-content'
import './home-about-section.css'

export function HomeAboutSection() {
  return (
    <section id="about" className="home-about">
      <span className="home-about__label">{homeAboutSectionContent.label}</span>
      <h2 className="home-about__title">
        {homeAboutSectionContent.title}
        <span className="home-about__title-soft">{homeAboutSectionContent.titleSoft}</span>
      </h2>

      <p className="home-about__description">{homeAboutSectionContent.description}</p>

      <div className="home-about__grid">
        {homeAdvantages.map((item, index) => (
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
