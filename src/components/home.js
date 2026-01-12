import React from "react";
import '../css/home.css';
import { useTranslation } from "react-i18next";
import i18n from '../i18n.js';
function Home() {
  const { t } = useTranslation();
const handleLanguageChange = (lang) => {
  i18n.changeLanguage(lang);
};
  return (
    <div
      id="home"
      className="home-background-img"
      role="banner"               /* główny baner strony */
      aria-label="Home section with hero image and title"
    >

      <div className="home-img" aria-hidden="true"></div> {/* dekoracyjne zdjęcie, nie dla screen readerów */}

      <div className="home-content">
        <h1 className="home-title">{t("siteTitle")}</h1>
        {/* <p className="home-subtitle">Your text here...</p> */}
      </div>

      {/* Cień MUSI być tutaj */}
      <div className="home-img-shadow" aria-hidden="true"></div> {/* dekoracyjny cień */}
      
    </div>
  );
}

export default Home;
