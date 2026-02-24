import React from "react";
import { 
  Button, 
  Container, 
  Form, 
  Nav, 
  Navbar, 
  NavDropdown, 
  Offcanvas 
} from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import i18n from '../i18n.js';

function OffcanvasExample() {
  const { t } = useTranslation();
  const expand = 'lg';

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    // Dodajemy role="navigation" dla poprawy dostępności (A11y)
    <Navbar 
      key={expand} 
      expand={expand} 
      className="bg-body-tertiary mb-3" 
      collapseOnSelect 
      role="navigation"
      aria-label="Main Navigation"
    >
      <Container fluid>
        <Navbar.Brand href="/">{t("navbarBrand")}</Navbar.Brand>
        
        {/* Toggle z lepszym opisem dla czytników */}
        <Navbar.Toggle 
          aria-controls={`offcanvasNavbar-expand-${expand}`} 
          aria-label={t("toggleNavigation") || "Toggle navigation"} 
        />
        
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              {t("offcanvasTitle")}
            </Offcanvas.Title>
          </Offcanvas.Header>
          
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#action1">{t("home")}</Nav.Link>
              <Nav.Link href="#action2">{t("link")}</Nav.Link>
              
              {/* Dropdown z ARIA */}
              <NavDropdown
                title={t("dropdown")}
                id={`offcanvasNavbarDropdown-expand-${expand}`}
                aria-label={t("dropdownMenu") || "Open submenu"}
              >
                <NavDropdown.Item href="#action3">{t("action")}</NavDropdown.Item>
                <NavDropdown.Item href="#action4">{t("anotherAction")}</NavDropdown.Item>
                <NavDropdown.Divider aria-hidden="true" />
                <NavDropdown.Item href="#action5">{t("somethingElseHere")}</NavDropdown.Item>
              </NavDropdown>

              {/* Dodane przełączanie języków z ARIA labels - pro dodatek */}
              <Nav.Link 
                onClick={() => handleLanguageChange('en')} 
                aria-label="Change language to English"
              >
                EN
              </Nav.Link>
              <Nav.Link 
                onClick={() => handleLanguageChange('pl')} 
                aria-label="Zmień język na polski"
              >
                PL
              </Nav.Link>
            </Nav>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder={t("search")}
                className="me-2"
                aria-label={t("search")}
              />
              <Button 
                variant="outline-success" 
                aria-label={t("searchSubmit") || "Submit search"}
              >
                {t("search")}
              </Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;