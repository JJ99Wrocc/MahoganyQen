import AboutMe from './components/aboutMe.js';
import Footer from './components/footer.js';
import Home from './components/home.js';
import Links from './components/links.js';
import ColorSchemesExample from './components/navbar.js';
import Sessions from './components/sessions.js';
import SwipperGallery from './components/swipperGallery.js'; 
import AdminPanel from "./components/AdminPanel.js";
import Belt from './components/belt.js';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./firebaseAuth.js";
import './App.css';

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
                <Belt />  
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
    </BrowserRouter>
  );
}

export default App;