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
      <div className="about-me-row">
        <div className="about-me-img">
          <div className="about-me-p">
            <h2 className="about-me-h2">{t("aboutMeTitle")}</h2>
            <hr className="about-me-hr" />
            <p className="about-me-text">{t("aboutMeText")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
