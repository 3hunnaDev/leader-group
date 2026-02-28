import homePrimeImage from "../../../assets/images/home-prime.jpg";
import "./home-hero-section.css";

export function HomeHeroSection() {
  return (
    <section id="home" className="home-hero">
      <div className="home-hero__head">
        <h1 className="home-hero__title">
          ПОСТАВКА,
          <span className="home-hero__title-soft">МОНТАЖ</span>
          <br />
          ПОДЪЕМНЫХ <span className="home-hero__title-soft">МЕХАНИЗМОВ</span>
        </h1>

        <div className="home-hero__side">
          <p className="home-hero__copy">
            We combine advanced machinery, disciplined fieldwork, and a
            commitment to excellence to deliver consistent, high-quality
            performance across every hectare.
          </p>
          <a href="/#contacts" className="home-hero__link">
            <span className="home-hero__link-icon">↓</span>
            EXPLORE MORE
          </a>
        </div>
      </div>
      <img
        src={homePrimeImage}
        alt="Leader Group field operations"
        className="home-hero__media"
      />
    </section>
  );
}
