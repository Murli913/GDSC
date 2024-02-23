import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import "./footer.css";
import link1 from "../../assets/links/link1.png";
import link2 from "../../assets/links/link2.png";
import link3 from "../../assets/links/link3.png";
import link4 from "../../assets/links/link4.png";
import link5 from "../../assets/links/link5.png";
import link6 from "../../assets/links/link6.png";

function Footer() {
    return (
        <footer className="body-font overflow-x-hidden" style={{ background: 'none' }}>
            <section className="footer-slider">
                <div className="footer-carousel owl-carousel flex justify-between items-center">
                                <div className="pl-4">
                                    <a href="https://www.unesco.org/en" target="_blank" title="External site that opens in a new window" className="ext-link w-1/6"><img alt="india-gov" src={link1} /></a>
                                </div>
                                <div className="pl-4">
                                    <a href="https://www.safetolearncoalition.org/" target="_blank" title="External site that opens in a new window" className="ext-link w-1/6"><img alt="mygov" src={link2} /></a>
                                </div>
                                <div className="pl-4">
                                    <a href="https://violenceagainstchildren.un.org/" target="_blank" title="External site that opens in a new window" className="ext-link w-1/6"><img alt="data-gov" src={link3} /></a>
                                </div>
                                <div className="pl-4">
                                    <a href="https://www.end-violence.org/" target="_blank" title="External site that opens in a new window" className="ext-link w-1/6"><img alt="nic" src={link4} /></a>
                                </div>
                                <div className="pl-4">
                                    <a href="https://www.ohchr.org/en/ohchr_homepage" target="_blank" title="External site that opens in a new window" className="ext-link w-1/6"><img alt="cpgrams" src={link5} /></a>
                                </div>
                                <div className="pl-4">
                                    <a href="https://peacekeeping.un.org/en" target="_blank" title="External site that opens in a new window" className="ext-link w-1/6"><img alt="Group of Twenty (G20)" src={link6} /></a>
                                </div>
                        </div>
            </section>
        </footer>
    );
}

export default Footer;

