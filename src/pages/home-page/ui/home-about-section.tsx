import './home-about-section.css'

const advantages = [
  {
    description:
      'Более 20 лет на рынке лифтового оборудования. Предлагаем решения с высоким уровнем безопасности и качества.',
    title: 'Опыт и надёжность',
  },
  {
    description:
      'Используем сертифицированные материалы и современное оборудование. Каждый лифт проходит строгий контроль.',
    title: 'Высокое качество',
  },
  {
    description:
      'Индивидуальное проектирование с учётом архитектуры объекта и требований заказчика.',
    title: 'Индивидуальный подход',
  },
  {
    description:
      'Поддержка на всех этапах: от проектирования до постгарантийного обслуживания.',
    title: 'Долгосрочное сотрудничество',
  },
]

export function HomeAboutSection() {
  return (
    <section id="about" className="home-about">
      <span className="home-about__label">О нас</span>
      <h2 className="home-about__title">
        Не просто лифты,
        <span className="home-about__title-soft"> а отношения.</span>
      </h2>

      <p className="home-about__description">
        Наша миссия заключается в обеспечении общества качественным и
        безопасным оборудованием в дополнении с уникальным дизайном. Мы хотим
        делать общество и мир вокруг нас лучше.
      </p>

      <div className="home-about__grid">
        {advantages.map((item, index) => (
          <article
            key={item.title}
            className={`home-about__card ${
              index === 0 ? 'home-about__card--primary' : ''
            }`}
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
