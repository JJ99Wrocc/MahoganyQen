import React from "react";
import '../css/aboutMe.css';
import { useTranslation } from "react-i18next";

function AboutMe() {
  const { t } = useTranslation();

  return (
    <section id="about-me" className="about-me-viewport">
      <div className="about-me-bg"></div>
      <div className="about-me-overlay"></div>
      
      <div className="about-me-container">
        <div className="about-me-glass-card">
          <h2 className="about-me-h2">
            {t("aboutMeTitle")}
            <span className="about-me-accent-line"></span>
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