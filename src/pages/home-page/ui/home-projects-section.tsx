import './home-projects-section.css'

const projects = [
  {
    location: 'Московская область',
    title: 'Riverhouse',
    type: 'Коммерческий объект',
  },
  {
    location: 'Казань',
    title: 'Аструм',
    type: 'Жилой комплекс',
  },
  {
    location: 'Тюмень',
    title: 'Школа, микрорайон Богородский',
    type: 'Образовательный объект',
  },
  {
    location: 'Кострома',
    title: 'Агрохим',
    type: 'Промышленный объект',
  },
]

export function HomeProjectsSection() {
  return (
    <section id="projects" className="home-projects">
      <div className="home-projects__head">
        <span className="home-projects__label">Наши проекты</span>
        <div className="home-projects__arrows">
          <button type="button" className="home-projects__arrow home-projects__arrow--light">
            ←
          </button>
          <button type="button" className="home-projects__arrow home-projects__arrow--dark">
            →
          </button>
        </div>
      </div>

      <h2 className="home-projects__title">
        Лифт — символ прогресса,
        <span className="home-projects__title-soft"> который поднимает вверх.</span>
      </h2>

      <div className="home-projects__grid">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={`home-projects__card ${
              index === 0 ? 'home-projects__card--primary' : ''
            }`}
          >
            <p className="home-projects__card-location">{project.location}</p>
            <p className="home-projects__card-title">{project.title}</p>
            <p className="home-projects__card-type">{project.type}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
