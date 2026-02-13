import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Offcanvas, Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "../css/navbar.css";
import Mletter from "../photo/Mletter.png";
import Icon from "../photo/Icon.svg";
import i18n from '../i18n.js';
import 'flag-icons/css/flag-icons.min.css';

function ColorSchemesExample() {
  const expand = "lg";
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOpen = () => setShowOffcanvas(true);
  const handleClose = () => setShowOffcanvas(false);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      key={expand}
      expand={expand}
      className={`navbar sticky-top ${scrolled ? "navbar-scrolled" : ""}`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <Container>

        {/* LOGO */}
       <Navbar.Brand
  onClick={(e) => {
    e.preventDefault(); // zatrzymuje domyślne skokowe przewijanie
    const section = document.getElementById("home");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
  aria-label="Mahogany Queen Home"
  tabIndex={0}
  className="d-flex align-items-center"
>
          <img
            src={Mletter}
            alt="Mahogany Queen logo"
            className="navbar-brand-img"
          />
          <span className="nav-title">ahoganyQen</span>
        </Navbar.Brand>

        {/* DROPDOWN JĘZYKOWY */}
        <Dropdown
          className="language-switcher"
          aria-label="Select language"
        >
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            aria-haspopup="menu"
            aria-expanded={false}
          >
            🌐
          </Dropdown.Toggle>

          <Dropdown.Menu
            role="menu"
            aria-label="Language selection"
          >
            <Dropdown.Item
              role="menuitem"
              tabIndex={0}
              aria-current={i18n.language === "pl" ? "true" : undefined}
              onClick={() => handleLanguageChange("pl")}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                handleLanguageChange("pl")
              }
            >
              <span className="fi fi-pl" aria-hidden="true"></span> Polski
            </Dropdown.Item>

            <Dropdown.Item
              role="menuitem"
              tabIndex={0}
              aria-current={i18n.language === "en" ? "true" : undefined}
              onClick={() => handleLanguageChange("en")}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                handleLanguageChange("en")
              }
            >
              <span className="fi fi-gb" aria-hidden="true"></span> English
            </Dropdown.Item>

            <Dropdown.Item
              role="menuitem"
              tabIndex={0}
              aria-current={i18n.language === "de" ? "true" : undefined}
              onClick={() => handleLanguageChange("de")}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                handleLanguageChange("de")
              }
            >
              <span className="fi fi-de" aria-hidden="true"></span> Deutsch
            </Dropdown.Item>

            <Dropdown.Item
              role="menuitem"
              tabIndex={0}
              aria-current={i18n.language === "es" ? "true" : undefined}
              onClick={() => handleLanguageChange("es")}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                handleLanguageChange("es")
              }
            >
              <span className="fi fi-es" aria-hidden="true"></span> Español
            </Dropdown.Item>

            <Dropdown.Item
              role="menuitem"
              tabIndex={0}
              aria-current={i18n.language === "ru" ? "true" : undefined}
              onClick={() => handleLanguageChange("ru")}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                handleLanguageChange("ru")
              }
            >
              <span className="fi fi-ru" aria-hidden="true"></span> Русский
            </Dropdown.Item>

            <Dropdown.Item
              role="menuitem"
              tabIndex={0}
              aria-current={i18n.language === "ua" ? "true" : undefined}
              onClick={() => handleLanguageChange("ua")}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                handleLanguageChange("ua")
              }
            >
              <span className="fi fi-ua" aria-hidden="true"></span> Українська
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* BURGER MENU */}
        <span
          className="burger-icon"
          role="button"
          tabIndex={0}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={showOffcanvas}
          aria-controls={`offcanvasNavbar-expand-${expand}`}
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleOpen();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            fill="none"
            className="burger-svg"
            aria-hidden="true"
          >
            <path className="line line1" d="M4 6h16" strokeLinecap="round" />
            <path className="line line2" d="M8 12h12" strokeLinecap="round" />
            <path className="line line3" d="M12 18h8" strokeLinecap="round" />
          </svg>
        </span>

        {/* OFFCANVAS MENU */}
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="start"
          show={showOffcanvas}
          onHide={handleClose}
          role="dialog"
          aria-modal="true"
          onKeyDown={(e) => e.key === "Escape" && handleClose()}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand-${expand}`}
              className="Menu"
            >
              {t("menu")}
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav
              className="justify-content-end flex-grow-1 pe-3"
              role="menu"
              aria-label="Main site sections"
            >
              <hr className="hr" />

          <Nav.Link
  role="menuitem"
  tabIndex={0}
  onClick={() => {
    const section = document.getElementById("gallery");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    handleClose();
  }}
>
  <img src={Icon} alt="" aria-hidden="true" className="red" />
  {t("gallery")}
</Nav.Link>

              <hr className="hr" />

       <Nav.Link
  role="menuitem"
  tabIndex={0}
  onClick={() => {
    // Smooth scroll do sekcji
    const section = document.getElementById("about-me");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    // Zamknięcie burger menu
    handleClose();
  }}
>
  <i
    className="fa-regular fa-address-card nav-icon"
    aria-hidden="true"
  ></i>
  {t("aboutMe")}
</Nav.Link>

              <hr className="hr" />

           <Nav.Link
  onClick={() => {
    document
      .getElementById("sessions-booking")
      .scrollIntoView({ behavior: "smooth" });
    handleClose(); 
  }}
>
  {t("session")}
</Nav.Link>
<hr className="hr" />
           <Nav.Link
  onClick={() => {
    document
      .getElementById("linki")
      .scrollIntoView({ behavior: "smooth" });
    handleClose(); 
  }}
>
 <i className="fa-solid fa-link nav-icon" aria-hidden="true"></i>  {t("links")}
</Nav.Link>

              <hr className="hr" />

  <Nav.Link
  role="menuitem"
  tabIndex={0}
  onClick={() => {
    const section = document.getElementById("contact-title");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    handleClose();
  }}
>
  <i className="fa-solid fa-phone-volume nav-icon" aria-hidden="true"></i>
  {t("contact")}
</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;
