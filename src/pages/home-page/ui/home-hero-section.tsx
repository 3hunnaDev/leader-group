import './home-hero-section.css'

const heroMetrics = [
  {
    description: 'Фиксированный срок поставки и монтажа.',
    title: 'Готовый лифт за 20 дней',
  },
  {
    description: 'Официальная гарантия на ключевые комплектующие.',
    title: '3 года гарантии на запчасти',
  },
  {
    description: 'Идентификация по отпечатку пальца и Face ID.',
    title: 'Face ID',
  },
  {
    description: 'Интеллектуальная система управления IC-картами.',
    title: 'IC карты',
  },
]

export function HomeHeroSection() {
  return (
    <section id="home" className="home-hero">
      <div className="home-hero__top-grid">
        <div>
          <span className="home-hero__label">Leader Group</span>
          <h1 className="home-hero__title">
            Поставка и монтаж
            <span className="home-hero__title-soft"> подъёмных</span> механизмов
          </h1>
        </div>

        <div className="home-hero__description-wrap">
          <p className="home-hero__description">
            Поставка, монтаж и обслуживание подъёмных механизмов по всей
            России. Работаем с жилыми и коммерческими объектами.
          </p>
          <a href="/#contacts" className="home-hero__cta-link">
            <span className="home-hero__cta-icon">↓</span>
            Оставить заявку
          </a>
        </div>
      </div>

      <div className="home-hero__metrics-surface">
        <p className="home-hero__surface-wordmark">Leader Group</p>
        <div className="home-hero__metrics-grid">
          {heroMetrics.map((item, index) => (
            <article
              key={item.title}
              className={`home-hero__metric-card ${
                index === 0 ? 'home-hero__metric-card--primary' : ''
              }`}
            >
              <p className="home-hero__metric-title">{item.title}</p>
              <p className="home-hero__metric-description">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
