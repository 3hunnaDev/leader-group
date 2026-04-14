import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './not-found-page.css'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <section className="not-found-page">
      <div className="not-found-page__card">
        <p className="not-found-page__code">404</p>
        <h1 className="not-found-page__title">{t('notFound.title')}</h1>
        <p className="not-found-page__description">{t('notFound.description')}</p>
        <Link to="/" className="not-found-page__link">
          {t('notFound.link')}
        </Link>
      </div>
    </section>
  )
}
