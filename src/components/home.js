import React from "react";
import '../css/home.css';
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

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
      </div>
    </div>
  );
}

export default Home;