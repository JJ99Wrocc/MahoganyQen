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
      <ColorSchemesExample />

      <Routes>
        {/* Strona główna */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Belt />
              <AboutMe />
              <SwipperGallery />
              <Sessions />
              <Links />
              <Footer />
            </>
          }
        />

        {/* Panel admina */}
        <Route
          path="/admin"
          element={user ? <AdminPanel /> : <Navigate to="/" replace />}
        />
      </Routes>
      <button onClick={scrollTo} className={`scroll-to-top ${scrollToTop ? "visible" : ""}`} aria-label="Scroll to top">

      </button>
    </BrowserRouter>
  );
}

export default App;
