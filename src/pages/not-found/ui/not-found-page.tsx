import { Link } from 'react-router-dom'
import './not-found-page.css'

export function NotFoundPage() {
  return (
    <section className="not-found-page">
      <div className="not-found-page__card">
        <p className="not-found-page__code">404</p>
        <h1 className="not-found-page__title">Page not found</h1>
        <p className="not-found-page__description">
          The requested page does not exist in the current route structure.
        </p>
        <Link to="/" className="not-found-page__link">
          Back to home
        </Link>
      </div>
    </section>
  )
}
