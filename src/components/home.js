import React from "react";
import '../css/home.css';
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  const handleScrollToSession = (e) => {
    e.preventDefault();
    const sessionSection = document.getElementById("sessions-booking");
    if (sessionSection) {
      sessionSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="home" className="home-hero-viewport" role="banner">
      {/* 1. Warstwa obrazu - Ken Burns */}
      <div className="home-img-layer" aria-hidden="true" loading="eager" fetchpriority="high"></div>
      
      {/* 2. Warstwy mroku i głębi */}
      <div className="home-vignette"></div>
      <div className="home-bottom-shadow"></div>

      {/* 3. Kontent z animacją wejścia */}
      <div className="home-content-wrapper">
        <h1 className="home-title-pro">
          <span className="title-glow">{t("siteTitle")}</span>
        </h1>
        <div className="title-underline"></div>
            <div
            className="belt-box"
            role="presentation"
            aria-hidden="true"
        >
            <div className='belt-bhi'></div>
            <h1 className='belt-text'>{t("beltText")}</h1>
        </div>
         <div  className="home-button">
          <a href="#session" className="home-btn home-btn-primary" aria-label="Request a private session with the Mistress"
           onClick={handleScrollToSession}>
           <span className="btn-text-glow">{t("Session Request")}</span>
          </a>
         <div className="arrow-wrapper">
    <div aria-hidden="true" className="arrow-down"></div>
  </div>
        </div>
      </div>
    </div>
  );
}

export default Home;