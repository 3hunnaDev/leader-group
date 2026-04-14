import { useTranslation } from 'react-i18next'
import { HashLink } from '@shared/ui/hash-link'
import { MediaPlaceholder } from '@shared/ui/media-placeholder'
import './home-hero-section.css'

export function HomeHeroSection() {
  const { i18n, t } = useTranslation()
  const isRussian = i18n.resolvedLanguage === 'ru'

  return (
    <section id="home" className="home-hero home-section">
      <div className="home-hero__head">
        <div>
          <span className="home-section__eyebrow">{t('hero.eyebrow')}</span>
          <h1 className="home-hero__title">
            {isRussian ? (
              <>
                <span className="home-hero__title-line">{t('hero.titleLine1')}</span>
                <span className="home-hero__title-line home-hero__title-line--ru-second">
                  {t('hero.titleLine2')}
                  <span className="home-hero__title-soft">
                    &nbsp;
                    {t('hero.titleLine2Soft')}
                  </span>
                </span>
                <span className="home-hero__title-line home-hero__title-line--ru-third">
                  {t('hero.titleLine3')}
                </span>
                <span className="home-hero__title-line home-hero__title-line--ru-fourth">
                  <span className="home-hero__title-soft">{t('hero.titleLine3Soft')}</span>
                </span>
              </>
            ) : (
              <>
                {t('hero.title')}
                <span className="home-hero__title-cluster">
                  <span className="home-hero__title-soft">
                    {t('hero.titleSoftStart')}
                    &nbsp;
                  </span>
                  {t('hero.titleTail')}
                  <span className="home-hero__title-soft">{t('hero.titleSoftEnd')}</span>
                </span>
              </>
            )}
          </h1>
        </div>

        <div className="home-hero__side">
          <p className="home-section__copy home-hero__copy">{t('hero.description')}</p>
          <div className="home-hero__actions">
            <HashLink to="/#solutions" className="home-button home-button--ghost">
              {t('common.ctaExploreSolutions')}
            </HashLink>
          </div>
        </div>
      </div>

      <div className="home-hero__media">
        <MediaPlaceholder
          label={t('common.placeholders.heroImage')}
          className="home-hero__media-main"
        />
        <MediaPlaceholder
          label={t('common.placeholders.supportingImage')}
          className="home-hero__media-side"
        />
      </div>
    </section>
  )
}
