import React from "react";
import '../css/aboutMe.css';
import { useTranslation } from "react-i18next";

function AboutMe() {
  const { t } = useTranslation();

  return (
    <section 
      id="about-me" 
      className="about-me-viewport"
      aria-labelledby="about-me-title" 
      data-nosnippet
    >

      <div className="about-me-bg" aria-hidden="true"></div>
      <div className="about-me-overlay" aria-hidden="true"></div>
      
      <div className="about-me-container">
        <div 
          className="about-me-glass-card"
     
          role="article"
        >
          <h2 id="about-me-title" className="about-me-h2">
            {t("aboutMeTitle")}
                <span className="about-me-accent-line" aria-hidden="true"></span>
          </h2>
          <p className="about-me-text">
            {t("aboutMeText")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;