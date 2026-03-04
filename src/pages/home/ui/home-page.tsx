import {
  HomeAboutSection,
  HomeContactSection,
  HomeHeroSection,
  HomeProjectsSection,
  HomeServicesSection,
} from '@widgets/home'
import './home-page.css'

export function HomePage() {
  return (
    <main className="home-page">
      <HomeHeroSection />
      <HomeServicesSection />
      <HomeAboutSection />
      <HomeProjectsSection />
      <HomeContactSection />
    </main>
  )
}
