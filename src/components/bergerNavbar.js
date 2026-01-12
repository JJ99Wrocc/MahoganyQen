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
    <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand href="#">{t("navbarBrand")}</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
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
              <NavDropdown
                title={t("dropdown")}
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                <NavDropdown.Item href="#action3">{t("action")}</NavDropdown.Item>
                <NavDropdown.Item href="#action4">{t("anotherAction")}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">{t("somethingElseHere")}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder={t("search")}
                className="me-2"
                aria-label={t("search")}
              />
              <Button variant="outline-success">{t("search")}</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;
