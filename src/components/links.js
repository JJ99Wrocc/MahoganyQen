import React from 'react';
import '../css/links.css';

// Importy obrazów (pamiętaj, aby fizycznie zmniejszyć te pliki do ok. 100x100px!)
import OnlyFans from '../photo/OnlyFans Logo.webp';
import Clips from '../photo/Clips4U.webp';
import IWant from '../photo/iWantsClips.webp';
import LoyalFans from '../photo/LoyalFans Logo.webp';
import FanSly from '../photo/FanSly Logo.webp';
import ManyVids from '../photo/ManyVids Logo.webp';
import PornHub from '../photo/PornHub Logo.webp';
import Twitter from '../photo/Twitter Logo.webp';
import ThroneGifts from '../photo/Thore Gifts Logo.webp';

const Links = () => {
    // Profesjonalne zarządzanie danymi w tablicy
    const socialLinks = [
        { id: 1, name: "Twitter", url: "https://x.com/LadyMahogany5", img: Twitter },
        { id: 2, name: "Throne Gifts", url: "https://throne.com/MahoganyQen", img: ThroneGifts },
        { id: 3, name: "OnlyFans", url: "https://onlyfans.com/mahoganyqen", img: OnlyFans },
        { id: 4, name: "Clips4You", url: "https://www.clips4sale.com/studio/177677/mahoganyqen", img: Clips },
        { id: 5, name: "IWantClips", url: "https://iwantclips.com/store/943108/mahoganyqen_", img: IWant },
        { id: 6, name: "LoyalFans", url: "https://www.loyalfans.com/mahoganyqen", img: LoyalFans },
        { id: 7, name: "FanSly", url: "https://fansly.com/MahoganyQen/posts", img: FanSly },
        { id: 8, name: "ManyVids", url: "https://www.manyvids.com/Profile/1004869140/mahoganyqen/Store/Videos", img: ManyVids },
        { id: 9, name: "PornHub", url: "https://pl.pornhub.com/model/mahoganyqen", img: PornHub },
    ];

    return (
        <section 
            className="links-page-wrapper" 
            aria-labelledby="links-section-title"
        >
            {/* Dekoracyjne warstwy tła - ukryte dla czytników */}
            <div className="links-bg-img" aria-hidden="true"></div>
            <div className="links-bg-overlay" aria-hidden="true"></div>
            <div className="links-bg-shadow-bottom" aria-hidden="true"></div>

            <div id="linki" className="container links-container">
                <header className="links-header">
                    <h2 id="links-section-title">My Links</h2>
                </header>
                
                <div 
                    className="row" 
                    role="list" 
                    aria-label="Social media and platform links"
                >
                    {socialLinks.map((link) => (
                        <div 
                            key={link.id} 
                            className="col-6 col-md-4 col-xl-2 links" 
                            role="listitem"
                        >
                            <a 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="link-item-anchor"
                                aria-label={`Follow me on ${link.name}`}
                            >
                                <div className="img-wrapper">
                                    <img 
                                        src={link.img} 
                                        alt=""
                                        className="img-links" 
                                        loading="lazy"
                                        width="60" 
                                        height="60"
                                        aria-hidden="true"
                                    />
                                </div>
                                <p className="link-label" aria-hidden="true">
                                    {link.name}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Links;