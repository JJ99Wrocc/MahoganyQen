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
  return (
    <footer
      id="contact-title"
      className="gold-footer"
      role="contentinfo"
      aria-label={t("siteFooter")}
    >
      <div
        className="footer-container container"
        aria-label={t("footerSections")}
      >
        {/* LEFT */}
        <div
          className="footer-left"
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

        {/* WRAPPER DLA EXPLORE + CONTACT */}
        <div
          className="footer-links-contact-wrapper"
          aria-label={t("footerNavigationContact")}
        >
          {/* EXPLORE */}
          <nav
            className="footer-links"
            role="navigation"
            aria-labelledby="explore-title"
            aria-label={t("footerNavigation")}
          >
            {/* MOBILE */}
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
                  setOpenExplore(!openExplore);
                }
              }}
            >
              {t("explore")}{" "}
              <i className="fa-solid fa-arrow-down" aria-hidden="true"></i>
            </h3>

            {/* DESKTOP */}
            <h3
              className="desktop-only"
              id="explore-title-desktop"
            >
              {t("explore")}
            </h3>

            <ul
              id="explore-list"
              className={`explore-list ${openExplore ? "open" : ""}`}
              role="list"
              aria-labelledby="explore-title"
            >
              <li role="listitem">
                <a href="#about-me" aria-label={t("goToAbout")}>
                  <i className="fa-regular fa-address-card" aria-hidden="true"></i>{" "}
                  {t("about")}
                </a>
              </li>

              <li role="listitem">
                <a href="#gallery" aria-label={t("goToGallery")}>
                  <i className="fa-solid fa-pepper-hot" aria-hidden="true"></i>{" "}
                  {t("gallery")}
                </a>
              </li>

              <li className="last-item" role="listitem">
                <a href="#sessions-booking" aria-label={t("goToSessions")}>
                  <i className="fa-regular fa-calendar-days" aria-hidden="true"></i>{" "}
                  {t("sessions")}
                </a>
              </li>

              <li role="listitem">
                <a href="#contact" aria-label={t("goToContact")}>
                  <i className="fa-solid fa-phone-volume" aria-hidden="true"></i>{" "}
                  {t("contact")}
                </a>
              </li>
            </ul>
          </nav>

          {/* CONTACT */}
          <div
            className="footer-contact"
            aria-labelledby="contact-title"
            aria-label={t("contactInformation")}
          >
            {/* MOBILE */}
            <h3
              id="contact"
              className="footer-title mobile-only"
              role="button"
              tabIndex={0}
              aria-expanded={openContact}
              aria-controls="contact-list"
              onClick={() => setOpenContact(!openContact)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setOpenContact(!openContact);
                }
              }}
            >
              {t("contact")}{" "}
              <i className="fa-solid fa-arrow-down" aria-hidden="true"></i>
            </h3>

            {/* DESKTOP */}
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
              aria-labelledby="contact-title"
            >
              <li role="listitem">
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                <a
                  href="mailto:mahoganyqueen@gmail.com"
                  className="email-link"
                  aria-label={t("sendEmail")}
                >
                  mahoganyqueen@gmail.com
                </a>
              </li>

              <li className="last-item" role="listitem">
                <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                <span aria-label={t("location")}>
                  {t("locationText")}
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* KONIEC WRAPPERA */}
      </div>

      <div className="footer-bottom" aria-label={t("footerCopyright")}>
        <p>© 2025 MAHOGANY QUEEN — {t("allRightsReserved")}</p>
      </div>
    </footer>
  );
}

export default Footer;
