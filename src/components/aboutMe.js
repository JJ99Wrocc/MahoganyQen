import React from "react";  
import '../css/aboutMe.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from "react-i18next";
import i18n from '../i18n.js';

function AboutMe() {
  const { t } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

return (
  <div id="about-me" className="about-me-content">
      {/* 1. WARSTWA ZDJĘCIA (tylko tło, ono będzie pływać) */}
      <div className="about-me-img"></div>

      {/* 2. WARSTWA TEKSTU (ona stoi sztywno na wierzchu) */}
      <div className="about-me-text-layer">
          <h2 className="about-me-h2">{t("aboutMeTitle")}</h2>
          <hr className="about-me-hr" />
          <p className="about-me-text">{t("aboutMeText")}</p>
      </div>
  </div>
);
}

export default AboutMe;
