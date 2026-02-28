//import { HomeAboutSection } from "./home-about-section";
//import { HomeContactSection } from "./home-contact-section";
import { HomeHeroSection } from "./home-hero-section";
//import { HomeProjectsSection } from "./home-projects-section";
//import { HomeServicesSection } from "./home-services-section";
import "./home-page.css";

export function HomePage() {
  return (
    <main className="home-page">
      <HomeHeroSection />
    </main>
  );
}
