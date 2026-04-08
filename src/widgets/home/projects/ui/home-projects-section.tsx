import { projectCases, projectShowcaseSection } from '@entities/project'
import { useState } from 'react'
import './home-projects-section.css'

export function HomeProjectsSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const projectCount = projectCases.length
  const hasProjectSwitching = projectCount > 1

  const handlePreviousProject = () => {
    if (!hasProjectSwitching) {
      return
    }

    setActiveProjectIndex((currentIndex) => {
      return (currentIndex - 1 + projectCount) % projectCount
    })
  }

  const handleNextProject = () => {
    if (!hasProjectSwitching) {
      return
    }

    setActiveProjectIndex((currentIndex) => {
      return (currentIndex + 1) % projectCount
    })
  }

  return (
    <section id="projects" className="home-projects">
      <div className="home-projects__head">
        <span className="home-projects__label">{projectShowcaseSection.sectionLabel}</span>
        <div className="home-projects__arrows">
          <button
            type="button"
            className="home-projects__arrow home-projects__arrow--light"
            aria-label="Показать предыдущий проект"
            onClick={handlePreviousProject}
            disabled={!hasProjectSwitching}
          >
            ←
          </button>
          <button
            type="button"
            className="home-projects__arrow home-projects__arrow--dark"
            aria-label="Показать следующий проект"
            onClick={handleNextProject}
            disabled={!hasProjectSwitching}
          >
            →
          </button>
        </div>
      </div>

      <h2 className="home-projects__title">
        {projectShowcaseSection.title}
        <span className="home-projects__title-soft">{projectShowcaseSection.titleSoft}</span>
      </h2>
      <p className="home-projects__status" aria-live="polite">
        {activeProjectIndex + 1} / {projectCount}
      </p>

      <div className="home-projects__grid">
        {projectCases.map((project, index) => (
          <article
            key={project.title}
            className={`home-projects__card ${
              index === activeProjectIndex ? 'home-projects__card--primary' : ''
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
