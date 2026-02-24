import React from 'react';
import '../css/links.css';
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
    return (
        <div className="links-page-wrapper">
            {/* Warstwy tła pasujące do reszty strony */}
            <div className="links-bg-img" aria-hidden="true"></div>
            <div className="links-bg-overlay" aria-hidden="true"></div>
            <div className="links-bg-shadow-bottom" aria-hidden="true"></div>

            <div id='linki' className='container links-container'>
                <div className="links-header">
                    <h2>My Links</h2>
                </div>
                
                <div className='row'>
                    <div className='col-6 col-md-4 col-xl-2 links'>
                        <a href="https://x.com/LadyMahogany5" target="_blank" rel="noopener noreferrer">
                            <img src={Twitter} alt="Twitter" className="img-links" />
                        </a>
                        <p className="link-label">Twitter</p>
                    </div>

                    <div className='col-6 col-md-4 col-xl-2 links'>
                        <a href="https://throne.com/MahoganyQen" target="_blank" rel="noopener noreferrer">
                            <img src={ThroneGifts} alt="Throne Gifts" className="img-links" />
                        </a>
                        <p className="link-label">Throne Gifts</p>
                    </div>

                    <div className='col-6 col-md-4 col-xl-2 links'>
                        <a href="https://onlyfans.com/mahoganyqen" target="_blank" rel="noopener noreferrer">
                            <img src={OnlyFans} alt="OnlyFans" className="img-links" />
                        </a>
                        <p className="link-label">OnlyFans</p>
                    </div>

                    <div className='col-6 col-md-4 col-xl-2 links'>
                        <a href="https://www.clips4sale.com/studio/177677/mahoganyqen" target="_blank" rel="noopener noreferrer">
                            <img src={Clips} alt="Clips" className="img-links" />
                        </a>
                        <p className="link-label">Clips4You</p>
                    </div>

                    <div className='col-6 col-md-4 col-xl-2 links'>
                        <a href="https://iwantclips.com/store/943108/mahoganyqen_" target="_blank" rel="noopener noreferrer">
                            <img src={IWant} alt="IWantClips" className="img-links" />
                        </a>
                        <p className="link-label">IWantClips</p>
                    </div>

                    <div className='col-6 col-md-4 col-xl-2 links'>
                        <a href="https://www.loyalfans.com/mahoganyqen" target="_blank" rel="noopener noreferrer">
                            <img src={LoyalFans} alt="LoyalFans" className="img-links" />
                        </a>
                        <p className="link-label">LoyalFans</p>
                    </div>

                    <div className='col-6 col-md-4 col-xl-2 links'>
                        <a href="https://fansly.com/MahoganyQen/posts" target="_blank" rel="noopener noreferrer">
                            <img src={FanSly} alt="FanSly" className="img-links" />
                        </a>
                        <p className="link-label">FanSly</p>
                    </div>

                    <div className='col-6 col-md-4 col-xl-2 links'>
                        <a href="https://www.manyvids.com/Profile/1004869140/mahoganyqen/Store/Videos" target="_blank" rel="noopener noreferrer">
                            <img src={ManyVids} alt="ManyVids" className="img-links" />
                        </a>
                        <p className="link-label">ManyVids</p>
                    </div>

                    <div className='col-6 col-md-4 col-xl-2 links'>
                        <a href="https://pl.pornhub.com/model/mahoganyqen" target="_blank" rel="noopener noreferrer">
                            <img src={PornHub} alt="PornHub" className="img-links" />
                        </a>
                        <p className="link-label">PornHub</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Links;