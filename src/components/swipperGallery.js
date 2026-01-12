import React from "react";
import { Carousel } from "react-bootstrap";
import "../css/swipperGallery.css";
import { useTranslation } from "react-i18next";

import Caruzel1 from '../photo/Caruzel 1.jpeg'; 
import Caruzel2 from '../photo/Caruzel 2.jpeg';
import Caruzel3 from '../photo/Caruzel 3.jpeg'; 
import Caruzel4 from '../photo/Caruzel4.jpeg';
import Caruzel5 from '../photo/Caruzel5.jpeg';
import Caruzel6 from '../photo/Caruzel6.jpeg';
import Caruzel7 from '../photo/Caruzel7.jpeg'; 
import Caruzel8 from '../photo/Caruzel8.jpeg';
import Caruzel9 from '../photo/Caruzel9.jpeg';
import Caruzel10 from '../photo/Caruzel10.jpeg';
import Caruzel11 from '../photo/Caruzel11.jpeg';   
import Caruzel12 from '../photo/Caruzel12.jpeg';
import Caruzel13 from '../photo/Caruzel13.jpeg';
import Caruzel14 from '../photo/Caruzel14.jpeg';
import Caruzel15 from '../photo/Caruzel15.jpeg';
import Caruzel16 from '../photo/Caruzel16.jpeg';
import Caruzel17 from '../photo/Caruzel17.jpeg';
import Caruzel18 from '../photo/Caruzel18.jpeg';
import i18n from '../i18n.js';
const images = [
  Caruzel1, Caruzel2, Caruzel3, Caruzel4, Caruzel5,
  Caruzel6, Caruzel7, Caruzel8, Caruzel9, Caruzel10,
  Caruzel11, Caruzel12, Caruzel13, Caruzel14, Caruzel15,
  Caruzel16, Caruzel17, Caruzel18
];
const handleLanguageChange = (lang) => {
  i18n.changeLanguage(lang);
};
function SwipperGallery() {
  const { t } = useTranslation();

  const getPrevIndex = (i) => (i === 0 ? images.length - 1 : i - 1);
  const getNextIndex = (i) => (i === images.length - 1 ? 0 : i + 1);

  return (
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
      >
        {images.map((img, i) => (
          <Carousel.Item key={i}>
            <div className="slide-wrapper">
              {/* poprzednie zdjęcie */}
              <img 
                className="slide-blur Caruzel-img" 
                src={images[getPrevIndex(i)]} 
                alt={`${t("galleryBlurLeft")} ${i + 1}`} 
              />
              
              {/* środkowe zdjęcie */}
              <img 
                className="slide-main Caruzel-img" 
                src={img} 
                alt={`${t("galleryMain")} ${i + 1}`} 
              />
              
              {/* następne zdjęcie */}
              <img 
                className="slide-blur Caruzel-img" 
                src={images[getNextIndex(i)]} 
                alt={`${t("galleryBlurRight")} ${i + 1}`} 
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default SwipperGallery;
