import React from "react";
import { Carousel } from "react-bootstrap";
import "../css/swipperGallery.css";
import { useTranslation } from "react-i18next";

// Import zdjęć w formacie WebP
import Caruzel1 from '../photo/Caruzel 1.webp'; 
import Caruzel2 from '../photo/Caruzel 2.webp';
import Caruzel3 from '../photo/Caruzel 3.webp'; 

import Caruzel5 from '../photo/Caruzel5.webp';
import Caruzel6 from '../photo/Caruzel6.webp';
import Caruzel7 from '../photo/Caruzel7.webp'; 
import Caruzel8 from '../photo/Caruzel8.webp';
import Caruzel9 from '../photo/Caruzel9.webp';
import Caruzel10 from '../photo/Caruzel10 (1).webp';
import Caruzel11 from '../photo/Caruzel11.webp';   
import Caruzel12 from '../photo/Caruzel12.webp';
import Caruzel13 from '../photo/Caruzel13.webp';
import Caruzel14 from '../photo/Caruzel14.webp';
import Caruzel15 from '../photo/Caruzel15.webp';
import Caruzel16 from '../photo/Caruzel16.webp';
import Caruzel17 from '../photo/Caruzel17.webp';
import Caruzel18 from '../photo/Caruzel18.webp';

const images = [
  Caruzel1, Caruzel2, Caruzel3,  Caruzel5,
  Caruzel6, Caruzel7, Caruzel8, Caruzel9, Caruzel10,
  Caruzel11, Caruzel12, Caruzel13, Caruzel14, Caruzel15,
  Caruzel16, Caruzel17, Caruzel18
];

function SwipperGallery() {
  const { t } = useTranslation();

  const getPrevIndex = (i) => (i === 0 ? images.length - 1 : i - 1);
  const getNextIndex = (i) => (i === images.length - 1 ? 0 : i + 1);

  return (
    <>
 <div className="gallery-preface">
  <div className="preface-line"></div>
  <div className="preface-content">
 
    <span className="preface-subtitle">{t("exhibition")}</span>
    <h2 className="preface-title">{t("visualExperience")}</h2>
    <div className="preface-diamond"></div>
  </div>
  <div className="preface-line"></div>
</div>

      {/* --- WŁAŚCIWA GALERIA --- */}
      <div 
        id='gallery' 
        className='caruzel-box' 
        role="region" 
        aria-label={t("gallerySection")}
      >
        <Carousel 
          indicators={true} 
          role="group" 
          aria-roledescription="carousel" 
          aria-label={t("gallerySection")} 
          interval={3000}
          pause="hover"
          fade={false} // Ustawienie na false zapewnia płynniejsze przejście przy wielu zdjęciach
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
                  loading={i < 2 ? "eager" : "lazy"} // Pierwsze blury też ładujemy szybciej
                />
                
                {/* GŁÓWNE ZDJĘCIE (środek) */}
                <img 
                  className="slide-main" 
                  src={img} 
                  alt={`${t("galleryMain")} ${i + 1}`} 
                  // ZMIANA: Ładujemy pierwsze 3 zdjęcia natychmiast, resztę leniwie
                  loading={i < 3 ? "eager" : "lazy"}
                  // ZMIANA: Dodajemy priorytet dla pierwszego widoku
                  {...(i === 0 ? { fetchpriority: "high" } : {})}
                />
                
                {/* Zdjęcie prawe (blur) */}
                <img 
                  className="slide-blur" 
                  src={images[getNextIndex(i)]} 
                  alt="" 
                  aria-hidden="true"
                  loading={i < 2 ? "eager" : "lazy"}
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