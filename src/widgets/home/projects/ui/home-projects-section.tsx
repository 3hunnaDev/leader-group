import { projectCases, projectShowcaseSection } from '@entities/project'
import { useState } from 'react'
import { MediaPlaceholder } from '@shared/ui/media-placeholder'
import './home-projects-section.css'

export function HomeProjectsSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const projectCount = projectCases.length
  const hasProjectSwitching = projectCount > 1
  const featuredProject = projectCases[activeProjectIndex]
  const secondaryProjects = projectCases.filter((_, index) => index !== activeProjectIndex)

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
    <section id="projects" className="home-projects home-section">
      <div className="home-section__head home-projects__head">
        <div>
          <span className="home-section__eyebrow">{projectShowcaseSection.sectionLabel}</span>
          <h2 className="home-section__title">
            {projectShowcaseSection.title}
            <span className="home-section__title-soft">{projectShowcaseSection.titleSoft}</span>
          </h2>
        </div>

        <div className="home-projects__head-side">
          <p className="home-section__copy">{projectShowcaseSection.description}</p>
          <div className="home-projects__controls">
            <p className="home-projects__status" aria-live="polite">
              {activeProjectIndex + 1} / {projectCount}
            </p>
            <div className="home-projects__arrows">
              <button
                type="button"
                className="home-projects__arrow home-projects__arrow--light"
                aria-label="Show previous project"
                onClick={handlePreviousProject}
                disabled={!hasProjectSwitching}
              >
                ←
              </button>
              <button
                type="button"
                className="home-projects__arrow home-projects__arrow--dark"
                aria-label="Show next project"
                onClick={handleNextProject}
                disabled={!hasProjectSwitching}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="home-projects__layout">
        <article className="home-projects__card home-projects__card--featured">
          <MediaPlaceholder label="Project image / 4:3" className="home-projects__media" />
          <span className="home-card-tag">
            {featuredProject.location} / {featuredProject.type}
          </span>
          <h3 className="home-projects__card-title">{featuredProject.title}</h3>
          <p className="home-projects__card-copy">{featuredProject.description}</p>
        </article>

        <div className="home-projects__stack">
          {secondaryProjects.map((project) => (
            <article key={project.title} className="home-projects__card">
              <MediaPlaceholder label="Project image / 4:3" className="home-projects__media" />
              <span className="home-card-tag">
                {project.location} / {project.type}
              </span>
              <h3 className="home-projects__card-title">{project.title}</h3>
              <p className="home-projects__card-copy">{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
