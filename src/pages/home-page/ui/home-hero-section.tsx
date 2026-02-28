import { useEffect, useRef } from "react";
import homePrimeImage from "../../../assets/images/021.jpg";
import "./home-hero-section.css";

const WARRANTY_TICKER_ITEMS = [
  "3 года гарантии на запчасти и работы",
  "Сертифицированный монтаж",
  "Сервисная поддержка 24/7",
];
const WARRANTY_TICKER_REPEAT_COUNT = 6;

export function HomeHeroSection() {
  const warrantyBarRef = useRef<HTMLDivElement>(null);
  const warrantyTrackRef = useRef<HTMLDivElement>(null);
  const warrantySegmentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = warrantyBarRef.current;
    const track = warrantyTrackRef.current;
    const segment = warrantySegmentRef.current;

    if (!bar || !track || !segment) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      track.style.transform = "translate3d(0, 0, 0)";
      bar.classList.add("home-hero__warranty-bar--ready");
      return;
    }

    let frameId = 0;
    let resizeFrameId = 0;
    let lastTimestamp = 0;
    let segmentSpan = 0;
    let phase = 0;
    const speedPxPerSecond = 72;

    const updateMarqueeMetrics = () => {
      const trackStyle = window.getComputedStyle(track);
      const columnGap = parseFloat(trackStyle.columnGap);
      const gapValue = Number.isFinite(columnGap)
        ? columnGap
        : parseFloat(trackStyle.gap);
      const gap = Number.isFinite(gapValue) ? gapValue : 0;
      const segmentWidth = segment.getBoundingClientRect().width;

      if (!segmentWidth) {
        return;
      }

      segmentSpan = segmentWidth + gap;
      phase %= segmentSpan;
      track.style.transform = `translate3d(${phase - segmentSpan}px, 0, 0)`;

      if (!bar.classList.contains("home-hero__warranty-bar--ready")) {
        bar.classList.add("home-hero__warranty-bar--ready");
      }
    };

    const scheduleMarqueeMetricsUpdate = () => {
      if (resizeFrameId) {
        cancelAnimationFrame(resizeFrameId);
      }

      resizeFrameId = window.requestAnimationFrame(updateMarqueeMetrics);
    };

    const animateMarquee = (timestamp: number) => {
      if (!segmentSpan) {
        frameId = window.requestAnimationFrame(animateMarquee);
        return;
      }

      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      const deltaMs = Math.min(48, timestamp - lastTimestamp);
      lastTimestamp = timestamp;

      phase += (speedPxPerSecond * deltaMs) / 1000;
      phase %= segmentSpan;
      track.style.transform = `translate3d(${phase - segmentSpan}px, 0, 0)`;

      frameId = window.requestAnimationFrame(animateMarquee);
    };

    updateMarqueeMetrics();
    frameId = window.requestAnimationFrame(animateMarquee);

    const resizeObserver = new ResizeObserver(scheduleMarqueeMetricsUpdate);
    resizeObserver.observe(segment);
    resizeObserver.observe(track);
    window.addEventListener("resize", scheduleMarqueeMetricsUpdate);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      if (resizeFrameId) {
        cancelAnimationFrame(resizeFrameId);
      }

      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleMarqueeMetricsUpdate);
    };
  }, []);

  return (
    <>
      <section id="home" className="home-hero">
        <div className="home-hero__head">
          <h1 className="home-hero__title">
            ПОСТАВКА И <span className="home-hero__title-soft">МОНТАЖ</span>
            <br />
            ПОДЪЕМНЫХ <span className="home-hero__title-soft">СИСТЕМ</span>
          </h1>
          <div className="home-hero__side">
            <p className="home-hero__copy">
              Проектируем и внедряем лифты, эскалаторы и траволаторы под ваш
              объект: от подбора оборудования до монтажа и сервисного
              сопровождения.
            </p>
            <a href="/#contacts" className="home-hero__link">
              <span className="home-hero__link-icon">↓</span>
              Узнать больше
            </a>
          </div>
        </div>
      </section>
      <div className="home-hero__media-shell" data-header-tone="dark">
        <div
          ref={warrantyBarRef}
          className="home-hero__warranty-bar"
          aria-label="Гарантийные условия"
        >
          <div ref={warrantyTrackRef} className="home-hero__warranty-track">
            {Array.from({ length: WARRANTY_TICKER_REPEAT_COUNT }).map(
              (_, groupIndex) => (
                <span
                  key={groupIndex}
                  ref={groupIndex === 0 ? warrantySegmentRef : undefined}
                  className="home-hero__warranty-line"
                  aria-hidden={groupIndex > 0}
                >
                  {WARRANTY_TICKER_ITEMS.map((item) => (
                    <span key={item} className="home-hero__warranty-item">
                      {item}
                    </span>
                  ))}
                </span>
              ),
            )}
          </div>
        </div>

        <img
          src={homePrimeImage}
          alt="Leader Group field operations"
          className="home-hero__media"
        />
      </div>
    </>
  );
}
