import React, { useEffect, useState,useRef } from "react";
import { Carousel } from "react-bootstrap";
import "../css/swipperGallery.css";
import { useTranslation } from "react-i18next";

// Import zdjęć
import Caruzel1 from '../photo/Caruzel 1.webp'; 
import Caruzel2 from '../photo/Caruzel 2.webp';
import Caruzel3 from '../photo/Caruzel 3.webp'; 
import Caruzel5 from '../photo/Caruzel5.webp';
import Caruzel6 from '../photo/Caruzel6.webp';
import Caruzel7 from '../photo/Caruzel7.webp'; 
import Caruzel8 from '../photo/Caruzel8.webp';
import Caruzel9 from '../photo/Caruzel9.webp';
import Caruzel10 from '../photo/Caruzel10.webp';
import Caruzel11 from '../photo/Caruzel11.webp';   
import Caruzel12 from '../photo/Caruzel12.webp';
import Caruzel13 from '../photo/Caruzel13.webp';
import Caruzel14 from '../photo/Caruzel14.webp';
import Caruzel15 from '../photo/Caruzel15.webp';
import Caruzel16 from '../photo/Caruzel16.webp';
import Caruzel17 from '../photo/Caruzel17.webp';
import Caruzel18 from '../photo/Caruzel18.webp';

const images = [
  Caruzel1, Caruzel2, Caruzel3, Caruzel5, Caruzel6, Caruzel7, 
  Caruzel8, Caruzel9, Caruzel10, Caruzel11, Caruzel12, 
  Caruzel13, Caruzel14, Caruzel15, Caruzel16, Caruzel17, Caruzel18
];

const altTexts = [
  "Mahogany Qen professional Dominatrix high-end BDSM session Europe",
  "Mahogany Qen authority and absolute discipline power exchange",
  "Mahogany Qen luxury fetish aesthetics elite latex mistress",
  "Mahogany Qen sophisticated domination professional femdom session",
  "Mahogany Qen exclusive BDSM experience premium fetish travel",
  "Mahogany Qen mistress of discipline professional power exchange",
  "Mahogany Qen high-standard professional domination services",
  "Mahogany Qen elegant fetish photography BDSM art",
  "Mahogany Qen professional femdom mistress session booking",
  "Mahogany Qen supreme authority professional bondage session",
  "Mahogany Qen elite lifestyle domination mistress Europe",
  "Mahogany Qen luxury BDSM studio professional session",
  "Mahogany Qen travel domina professional tour dates",
  "Mahogany Qen leather and latex professional aesthetics",
  "Mahogany Qen strict discipline high-end fetish mistress",
  "Mahogany Qen professional domination protocol and etiquette",
  "Mahogany Qen expert mistress professional power exchange"
];

function SwipperGallery() {
  const { t } = useTranslation();
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const openFullscreen = (index) => setCurrentIndex(index);
const closeFullscreen = () => setCurrentIndex(null);
const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgW, imgH], setSize] = useState([0, 0]);
const imgRef = useRef(null);
const handleMagnifier = (e) => {
  const elem = e.currentTarget;
  const { top, left, width, height } = elem.getBoundingClientRect();

  // Sprawdzamy, czy to dotyk, czy myszka
  let clientX, clientY;
  
  if (e.touches) {
    // Zapobiega przesuwaniu strony podczas jeżdżenia palcem po fotce
    if (e.cancelable) e.preventDefault(); 
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  const posX = clientX - left;
  const posY = clientY - top;

  setSize([width, height]);
  setXY([posX, posY]);
};;// Funkcja do cofania zdjęcia (prev)
  const prevImg = () => {
    const currentIndex = images.indexOf(fullscreenImg);
    const prevIndex = (currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    setFullscreenImg(images[prevIndex]);
  };

  // Funkcja do przechodzenia do przodu (next)
  const nextImg = () => {
    const currentIndex = images.indexOf(fullscreenImg);
    const nextIndex = (currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    setFullscreenImg(images[nextIndex]);
  };

  // Obsługa klawiatury (ESC, Strzałki) - Standard 100k PLN
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!fullscreenImg) return;
      if (e.key === "Escape") setFullscreenImg(null);
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreenImg]); // Reaguje na zmianę zdjęcia
const showNext = (e) => {
  e.stopPropagation();
  setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
};

const showPrev = (e) => {
  e.stopPropagation();
  setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
};
 useEffect(() => {
    if (fullscreenImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [fullscreenImg]);
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .catch(err => console.log("SW registration failed", err));
    }
  }, []);

  const getPrevIndex = (i) => (i === 0 ? images.length - 1 : i - 1);
  const getNextIndex = (i) => (i === images.length - 1 ? 0 : i + 1);

  return (
    <>
  {fullscreenImg && (
  <div className="fs-overlay" onClick={() => setFullscreenImg(null)}>
    <button className="fs-close" onClick={() => setFullscreenImg(null)}>
      <div className="close-lines"></div>
    </button>

    <div className="fs-content-container">
      <button className="fs-nav-btn left" onClick={(e) => { e.stopPropagation(); prevImg(); }}>
        <span className="arrow-icon"></span>
      </button>

      {/* TUTAJ DZIEJE SIĘ MAGIA LUPY */}
  <div className="fs-main-stage">
  <div 
    className="magnifier-container" 
    onMouseEnter={() => setShowMagnifier(true)}
    onMouseMove={handleMagnifier}
    onMouseLeave={() => setShowMagnifier(false)}
    onTouchStart={() => setShowMagnifier(true)}
  onTouchMove={handleMagnifier}
  onTouchEnd={() => setShowMagnifier(false)}
    style={{ 
      position: 'relative', 
      display: 'inline-block', // To sprawia, że kontener nie jest szerszy niż fota
      lineHeight: 0 // Usuwa dziwny odstęp na dole zdjęcia
    }}
  >
    <img 
      ref={imgRef} 
      src={fullscreenImg} 
      alt="Pro view" 
      className="fs-img-content" 
      style={{ display: 'block', maxWidth: '100%', maxHeight: '85vh' }}
    />

    {showMagnifier && (
      <div 
        className="magnifier-glass"
    style={{
  position: 'absolute',
  top: `${y - 50}px`,
  left: `${x - 50}px`,
  backgroundImage: `url(${fullscreenImg})`,
  backgroundSize: `${imgW * 1.5}px ${imgH * 1.5}px`, 
  // OBLICZENIA DLA ZOOMU 10x:
  backgroundPosition: `${(x / imgW) * 100}% ${(y / imgH) * 100}%`,
  backgroundRepeat: 'no-repeat',
  pointerEvents: 'none'
}}
      />
    )}
  </div>
</div>

      <button className="fs-nav-btn right" onClick={(e) => { e.stopPropagation(); nextImg(); }}>
        <span className="arrow-icon"></span>
      </button>
    </div>
  </div>
)}      <div className="gallery-preface">
        <div className="preface-line"></div>
        <div className="preface-content">
          <span className="preface-subtitle">{t("exhibition")}</span>
          <h2 className="preface-title">{t("visualExperience")}</h2>
          <div className="preface-diamond"></div>
        </div>
        <div className="preface-line"></div>
      </div>

      <div 
        id='gallery' 
        className='caruzel-box' 
        role="region" 
        aria-label={t("gallerySection")}
        title="Mahogany Qen - Visual Experience & Professional Portfolio"
      >
        <Carousel 
          indicators={true} 
          role="group" 
          aria-roledescription="carousel" 
          interval={3000}
          pause="hover"
          fade={false}
        >
          {images.map((img, i) => (
            <Carousel.Item key={i}>
              <div className="slide-wrapper">
                
                {/* Zdjęcie lewe (blur) */}
                <img 
                  className="slide-blur" 
                  src={images[getPrevIndex(i)]} 
                  alt="" 
                  aria-hidden="true"
                  width="400"
                  height="600"
                  loading="lazy" 
                />
                
                {/* GŁÓWNE ZDJĘCIE - KLIKALNE */}
<img 
  className="slide-main" 
  src={img} 
  alt={altTexts[i]} 
  width="800"
  height="1200"
  loading={i < 2 ? "eager" : "lazy"}
  {...(i === 0 ? { fetchpriority: "high" } : {})}
  onClick={() => setFullscreenImg(img)}
  style={{
    width: 'auto',      
    height: 'auto',
    maxWidth: '100%',     
    maxHeight: '100%',    
    objectFit: 'contain',
    display: 'block',
    cursor: 'zoom-in' // Dodaj to, żeby było wiadomo, że można kliknąć
  }}
/>
                {/* Zdjęcie prawe (blur) */}
                <img 
                  className="slide-blur" 
                  src={images[getNextIndex(i)]} 
                  alt="" 
                  aria-hidden="true"
                  width="400"
                  height="600"
                  loading="lazy"
                />
                
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default SwipperGallery;