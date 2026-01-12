import React from 'react';
import '../css/belt.css';
import { useTranslation } from "react-i18next";
import i18n from '../i18n.js';
function Belt() {   
    const { t } = useTranslation();
const handleLanguageChange = (lang) => {
  i18n.changeLanguage(lang);
};
    return (
        <div
            className="belt-box"
            role="presentation"
            aria-hidden="true"
        >
            <div className='belt-bhi'></div>
            <div className='belt-text'>{t("beltText")}</div>
        </div>
    );
}

export default Belt;
