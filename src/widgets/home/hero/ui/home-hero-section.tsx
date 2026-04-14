import { HashLink } from '@shared/ui/hash-link'
import { MediaPlaceholder } from '@shared/ui/media-placeholder'
import './home-hero-section.css'

export function HomeHeroSection() {
  return (
    <section id="home" className="home-hero home-section">
      <div className="home-hero__head">
        <div>
          <span className="home-section__eyebrow">Leader Group / Vertical Mobility</span>
          <h1 className="home-hero__title">
            Vertical mobility <span className="home-hero__title-soft">built</span> for modern
            <span className="home-hero__title-soft"> architecture.</span>
          </h1>
        </div>

        <div className="home-hero__side">
          <p className="home-section__copy home-hero__copy">
            We design, supply, install, and service lifts, escalators, and travelators for
            residential, commercial, and public environments across Russia.
          </p>
          <div className="home-hero__actions">
            <HashLink to="/#contact" className="home-button home-button--dark">
              Request a proposal
            </HashLink>
            <HashLink to="/#solutions" className="home-button home-button--ghost">
              Explore solutions
            </HashLink>
          </div>
        </div>
      </div>

      <div className="home-hero__media">
        <MediaPlaceholder label="Hero image / 16:9" className="home-hero__media-main" />
        <MediaPlaceholder label="Supporting image / 4:5" className="home-hero__media-side" />
      </div>
    </section>
  )
}
