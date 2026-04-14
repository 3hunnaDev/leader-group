import { companyProofBlocks, companyProofSection } from '@entities/company'
import './home-proof-section.css'

export function HomeProofSection() {
  return (
    <section id="why-us" className="home-proof home-section">
      <div className="home-section__head">
        <div>
          <span className="home-section__eyebrow">{companyProofSection.sectionLabel}</span>
          <h2 className="home-section__title">
            {companyProofSection.title}
            <span className="home-section__title-soft">{companyProofSection.titleSoft}</span>
          </h2>
        </div>
        <p className="home-section__copy">{companyProofSection.description}</p>
      </div>

      <div className="home-proof__grid">
        {companyProofBlocks.map((item) => (
          <article
            key={item.title}
            className={`home-proof__card ${item.isAccent ? 'home-proof__card--accent' : ''}`}
          >
            <div>
              <p className="home-proof__kicker">{item.kicker}</p>
              <h3 className="home-proof__card-title">{item.title}</h3>
            </div>
            <p className="home-proof__card-copy">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
