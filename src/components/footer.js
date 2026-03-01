import React, { useState } from "react";
import "../css/footer.css";
import { useTranslation } from "react-i18next";
import i18n from '../i18n.js';

function Footer() {
  const { t } = useTranslation();
  const [openContact, setOpenContact] = useState(false);
  const [openExplore, setOpenExplore] = useState(false);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
  <div id="contact-title" className="footer-page-wrapper">
      {/* BACKGROUND ELEMENTS */}
      <div className="footer-bg-img" aria-hidden="true"></div>
      <div className="footer-bg-overlay" aria-hidden="true"></div>
      <div className="footer-bg-shadow-top" aria-hidden="true"></div>

      {/* --- TUTAJ DODAJESZ SEKCJĘ SEO --- */}
   
      <footer
        id="contact-title-main"
        className="gold-footer"
        role="contentinfo"
        aria-label={t("siteFooter")}
      >
        <div
          className="footer-container container"
          role="group"
          aria-label={t("footerSections")}
        >
          {/* LEFT SECTION */}
          <div
            className="footer-left"
            role="region"
            aria-labelledby="footer-logo"
          >
            <h2
              id="footer-logo"
              className="footer-logo"
            >
              {t("footerBrand")}
            </h2>

            <p className="footer-desc">
              {t("footerTagline")}
            </p>
          </div>

         
          <div
            className="footer-links-contact-wrapper"
            role="group"
            aria-label={t("footerNavigationContact")}
          >
       
            <nav
              className="footer-links"
              role="navigation"
              aria-labelledby="explore-title-desktop"
            >
          
              <h3
                id="explore-title"
                className="footer-title mobile-only"
                role="button"
                tabIndex={0}
                aria-expanded={openExplore}
                aria-controls="explore-list"
                onClick={() => setOpenExplore(!openExplore)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenExplore(!openExplore);
                  }
                }}
              >
                {t("explore")}{" "}
                <i className={`fa-solid ${openExplore ? 'fa-arrow-up' : 'fa-arrow-down'}`} aria-hidden="true"></i>
              </h3>

              {/* DESKTOP TITLE */}
              <h3
                className="desktop-only"
                id="explore-title-desktop"
                aria-hidden="true"
              >
                {t("explore")}
              </h3>

              <ul
                id="explore-list"
                className={`explore-list ${openExplore ? "open" : ""}`}
                role="list"
              >
                <li role="listitem">
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={() => scrollToSection("about-me")}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && scrollToSection("about-me")}
                    aria-label={t("goToAbout")}
                    className="footer-link-button"
                  >
                    <i className="fa-regular fa-address-card" aria-hidden="true"></i>{" "}
                    {t("about")}
                  </span>
                </li>

                <li role="listitem">
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={() => scrollToSection("gallery")}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && scrollToSection("gallery")}
                    aria-label={t("goToGallery")}
                    className="footer-link-button"
                  >
                    <i className="fa-solid fa-pepper-hot" aria-hidden="true"></i>{" "}
                    {t("gallery")}
                  </span>
                </li>

                <li className="last-item" role="listitem">
                  <span 
                    role="button"
                    tabIndex={0}
                    onClick={() => scrollToSection("sessions-booking")}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && scrollToSection("sessions-booking")}
                    aria-label={t("goToSessions")}
                    className="footer-link-button"
                  >
                    <i className="fa-regular fa-calendar-days" aria-hidden="true"></i>{" "}
                    {t("sessions")}
                  </span>
                </li>
                
                <li role="listitem">
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={() => scrollToSection("linki")}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && scrollToSection("linki")}
                    aria-label={t("goToLinks")}
                    className="footer-link-button"
                  >
                    <i className="fa-solid fa-link" aria-hidden="true"></i>{" "}
                    {t("links")}
                  </span>
                </li>

              
              </ul>
            </nav>

            {/* CONTACT SECTION */}
            <div
              className="footer-contact"
              role="region"
              aria-labelledby="contact-title-desktop"
            >
              {/* MOBILE BUTTON */}
              <h3
                id="contact-mobile-trigger"
                className="footer-title mobile-only"
                role="button"
                tabIndex={0}
                aria-expanded={openContact}
                aria-controls="contact-list"
                onClick={() => setOpenContact(!openContact)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenContact(!openContact);
                  }
                }}
              >
                {t("contact")}{" "}
                <i className={`fa-solid ${openContact ? 'fa-arrow-up' : 'fa-arrow-down'}`} aria-hidden="true"></i>
              </h3>

              {/* DESKTOP TITLE */}
              <h3
                className="desktop-only"
                id="contact-title-desktop"
              >
                {t("contact")}
              </h3>

              <ul
                id="contact-list"
                className={`contact-list ${openContact ? "open" : ""}`}
                role="list"
              >
                <li role="listitem">
                  <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                  <a
                    href="mailto:MahoganyQenContact@gmail.com"
                    className="email-link"
                    aria-label={`${t("sendEmail")} MahoganyQenContact@gmail.com`}
                  >
                    MahoganyQenContact@gmail.com
                  </a>
                </li>

                <li className="last-item" role="listitem">
                  <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                  <address style={{ display: "inline", fontStyle: "normal" }} aria-label={t("location")}>
                    {t("locationText")}
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

                   <section className="protocol-seo-section" aria-label="Professional Protocol">
       <section className="protocol-seo-section" aria-label={t("protocolAriaLabel")}>
  <details>
    <summary>{t("protocolSummary")}</summary>
    <div className="protocol-content">
      <h2>{t("protocolTitle")}</h2>
      <p>
        {t("protocolDesc1")} <strong>Mahogany Qen</strong> {t("protocolDesc2")} <strong>{t("protocolDesc3")}</strong>. 
        {t("protocolDesc4")} <strong>{t("protocolDesc5")}</strong>, {t("protocolDesc6")} <strong>{t("protocolDesc7")}</strong> 
        {t("protocolDesc8")} <strong>{t("protocolDesc9")}</strong>, <strong>{t("protocolDesc10")}</strong>, {t("protocolDesc11")}.
      </p>
      <ul>
        <li><strong>{t("protocolBooking")}:</strong> {t("protocolBookingDesc1")} <strong>{t("protocolBookingDesc2")}</strong>.</li>
        <li><strong>{t("protocolTravel")}:</strong> {t("protocolTravelDesc1")} <strong>{t("protocolTravelDesc2")}</strong>.</li>
        <li><strong>{t("protocolEtiquette")}:</strong> {t("protocolEtiquetteDesc1")} <strong>{t("protocolEtiquetteDesc2")}</strong> {t("protocolEtiquetteDesc3")}.</li>
      </ul>
    </div>
  </details>
</section>
        {/* BOTTOM COPYRIGHT */}
        <div 
          className="footer-bottom" 
          role="contentinfo" 
          aria-label={t("footerCopyright")}
        >
          <p>© 2025 MAHOGANYQEN — {t("allRightsReserved")}</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;