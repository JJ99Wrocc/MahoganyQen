import AboutMe from './components/aboutMe.js';
import Footer from './components/footer.js';
import Home from './components/home.js';
import Links from './components/links.js';
import ColorSchemesExample from './components/navbar.js';
import Sessions from './components/sessions.js';
import SwipperGallery from './components/swipperGallery.js'; 
import AdminPanel from "./components/AdminPanel.js";

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./firebaseAuth.js";
import './App.css';
import CookieConsent from "react-cookie-consent";

function App() {
  const { user } = useAuth();
  const [scrollToTop, setScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = () => {
    window.scrollTo({ top:0, behavior: "smooth" });
  };

  return (
    <BrowserRouter>
      {/* Nagłówek strony - rola banner informuje, że to nawigacja górna */}
      <header role="banner">
        <ColorSchemesExample />
      </header>

      <main role="main">
        <Routes>
         
          <Route
            path="/"
            element={
              <>
                <Home />
          
                <AboutMe />
                <SwipperGallery />
                <Sessions />
     
                <div className="shared-bottom-section" role="group" aria-label="Links and Footer section">
          
                  <div className="shared-bg-img" aria-hidden="true"></div>
                  <div className="shared-bg-overlay" aria-hidden="true"></div>
                  <div className="shared-bg-shadow-top" aria-hidden="true"></div>
                  
                  <Links />
                  <Footer />
                </div>
              </>
            }
          />

          <Route
            path="/admin"
            element={user ? <AdminPanel /> : <Navigate to="/" replace />}
          />
        </Routes>
      </main>

      <button 
        onClick={scrollTo} 
        className={`scroll-to-top ${scrollToTop ? "visible" : ""}`} 
        aria-label="Scroll back to top of the page"
        title="Scroll to top"
      >
      </button>
      <CookieConsent
  location="bottom"
  buttonText="Rozumiem"
  cookieName="myAwesomeCookieName"
  style={{ background: "#2B373B", fontSize: "13px" }}
  buttonStyle={{ color: "#4e503b", fontSize: "13px", borderRadius: "5px" }}
  expires={150}
>
  Ta strona używa ciasteczek, aby sesja rezerwacji działała poprawnie. 🍪
</CookieConsent>
    </BrowserRouter>
  );
}

export default App;