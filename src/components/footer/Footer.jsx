import React, { useContext } from 'react'
import myContext from '../../context/data/myContext';
import "./footer.css";


function Footer() {
    const context = useContext(myContext);
    const { mode } = context;
   
    
    return (
           <footer className="body-font" styles={{ background: mode === 'dark' ? 'rgb(30, 41, 59)' : '#30336b' }}>
            <section class="footer-slider">
             <div class="container">
              <div class="row">
               <div class="col-12">
              <div class="footer-carousel owl-carousel">
                  <a href="https://www.india.gov.in/" target="_blank" title="External site that opens in a new window" class="ext-link"><img alt="india-gov" src="https://services.india.gov.in/assets/images/india-gov.png"/></a>
                  <a href="https://www.mygov.in/" target="_blank" title="External site that opens in a new window" class="ext-link"><img alt="mygov" src="https://services.india.gov.in/assets/images/mygov.png"/></a>
                  <a href="https://data.gov.in/" target="_blank" title="External site that opens in a new window" class="ext-link"><img alt="data-gov" src="https://services.india.gov.in/assets/images/data-gov.png"/></a>
                  <a href="http://www.nic.in/" target="_blank" title="External site that opens in a new window" class="ext-link"><img alt="nic"  src="https://services.india.gov.in/assets/images/logo-nic-blue.png"/></a>
                  <a href="https://pgportal.gov.in" target="_blank" title="External site that opens in a new window" class="ext-link"><img alt="cpgrams" src="https://services.india.gov.in/assets/images/cpgrams.png"/></a>
                  <a href="https://www.g20.org" target="_blank" title="External site that opens in a new window" class="ext-link"><img alt="Group of Twenty (G20)"  src="https://services.india.gov.in/assets/images/g20_logo.png"/></a>
              </div>
              
          </div>
      </div>                
  </div>
</section>

        </footer>
      

    )
}

export default Footer