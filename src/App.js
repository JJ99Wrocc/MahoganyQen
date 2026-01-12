import AboutMe from './components/aboutMe.js';
import Footer from './components/footer.js';
import Home from './components/home.js';
import ColorSchemesExample from './components/navbar.js';
import Sessions from './components/sessions.js';
import SwipperGallery from './components/swipperGallery.js'; 
import AdminPanel from "./components/AdminPanel.js";
import Belt from './components/belt.js';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./firebaseAuth.js";

function App() {
  const { user } = useAuth();

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
    </BrowserRouter>
  );
}

export default App;
