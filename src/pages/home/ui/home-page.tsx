import {
  HomeApproachSection,
  HomeContactSection,
  HomeHeroSection,
  HomeProofSection,
  HomeProjectsSection,
  HomeServicesSection,
} from '@widgets/home'
import './home-page.css'

export function HomePage() {
  return (
    <main className="home-page">
      <HomeHeroSection />
      <HomeServicesSection />
      <HomeProofSection />
      <HomeApproachSection />
      <HomeProjectsSection />
      <HomeContactSection />
    </main>
  )
}
