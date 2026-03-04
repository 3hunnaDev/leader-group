import {
  HomeAboutSection,
  HomeContactSection,
  HomeHeroSection,
  HomeProjectsSection,
  HomeServicesSection,
} from '@widgets/home'

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
