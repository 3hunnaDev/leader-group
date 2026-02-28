import './home-services-section.css'

const assortmentItems = [
  {
    description:
      'Комплексные решения для офисных и многофункциональных объектов с высокой нагрузкой.',
    title: 'Лифты для бизнес центров',
  },
  {
    description:
      'Современные пассажирские решения для жилых комплексов и частных домов.',
    title: 'Лифты для жилых домов',
  },
  {
    description:
      'Панорамные системы с акцентом на дизайн, обзор и бесшумную работу.',
    title: 'Панорамные лифты',
  },
  {
    description:
      'Проектирование, поставка и обслуживание эскалаторов и траволаторов.',
    title: 'Эскалаторы и траволаторы',
  },
]

export function HomeServicesSection() {
  return (
    <section id="assortment" className="home-services">
      <div className="home-services__intro">
        <span className="home-services__label">Ассортимент и услуги</span>
        <h2 className="home-services__title">Подъёмное оборудование</h2>
      </div>

      <div className="home-services__cards-grid">
        {assortmentItems.map((item) => (
          <article key={item.title} className="home-services__card">
            <p className="home-services__card-meta">Leader Group</p>
            <h3 className="home-services__card-title">{item.title}</h3>
            <p className="home-services__card-description">{item.description}</p>
            <a href="/#contacts" className="home-services__card-link">
              Подробнее
            </a>
          </article>
        ))}
      </div>

      <div className="home-services__catalog">
        <p className="home-services__catalog-meta">Каталог</p>
        <p className="home-services__catalog-title">
          Лифт — это маленькая вселенная, где время останавливается, а люди
          встречаются.
        </p>
        <a href="/#contacts" className="home-services__catalog-link">
          Смотреть весь каталог
        </a>
      </div>
    </section>
  )
}
