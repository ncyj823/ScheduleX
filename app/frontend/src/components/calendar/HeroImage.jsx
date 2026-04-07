import { useState } from "react";
import { MONTH_IMAGES, MONTH_NAMES } from "../../utils/calendarUtils";

export function HeroImage({ month, year }) {
  const [loaded, setLoaded] = useState(false);
  const monthIndex = month;
  const imageUrl = MONTH_IMAGES[monthIndex];

  return (
    <div className="hero-image-panel" data-testid="hero-image-panel">
      <div className="hero-image-wrapper">
        {!loaded && <div className="hero-image-skeleton" />}
        <img
          src={imageUrl}
          alt={`${MONTH_NAMES[monthIndex]} landscape`}
          className={`hero-image ${loaded ? "hero-image-loaded" : "hero-image-loading"}`}
          onLoad={() => setLoaded(true)}
          draggable={false}
          data-testid="hero-image"
        />
        <div className="hero-image-overlay">
          <div className="hero-image-text">
            <span className="hero-year">{year}</span>
            <span className="hero-month">{MONTH_NAMES[monthIndex]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
