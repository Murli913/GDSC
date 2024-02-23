
import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import "./HeroSection.css";
import bannertwo from "../../assets/banner-2.png"
import bannerthree from "../../assets/banner-3.png"
import bannerthirteen from "../../assets/banner-13.png"
import bannerfourteen from "../../assets/banner-14.png"
import bannerfifteen from "../../assets/banner-15.png"
import bannersixteen from "../../assets/banner-16.png"
import bannerseventeen from "../../assets/banner-17.png"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function HeroSection() {
  const context = useContext(myContext);
  const { mode } = context;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
        autoplaySpeed: 1500
   
  };

  return (
    <section style={{ background: mode === 'dark' ? 'rgb(30, 41, 59)' : '#30336b' }}>
      {/* Hero Section  */}
   
      <Slider {...settings}>
      <div className="rounded-xl h-[50vh]">
        <img
          src={bannerthirteen}
          alt="image 1"
          className="h-full w-full object-cover"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="rounded-xl h-[50vh]">
      <img
                src={bannerthree}
                alt="image 2"
                className="object-cover"
                style={{ objectFit: 'cover' }}
              />
      </div>
      <div className="rounded-xl h-[50vh]">
      <img
                src={bannertwo}
                alt="image 3"
                className="h-full w-full object-cover"
              />
      </div>
      <div className="rounded-xl h-[50vh]">
      <img
                src={bannerfourteen}
                alt="image 4"
                className="h-full w-full object-cover"
              />
      </div>
      <div className="rounded-xl h-[50vh]">
            <img
                src={bannerfifteen}
                alt="image 4"
                className="h-full w-full object-cover"
            />
        </div>
        <div className="rounded-xl h-[50vh]">
            <img
                src={bannersixteen}
                alt="image 4"
                className="h-full w-full object-cover"
            />
        </div>
        <div className="rounded-xl h-[50vh]">
            <img
                src={bannerseventeen}
                alt="image 4"
                className="h-full w-full object-cover"
            />
      </div>
    </Slider>
    </section>
  );
}

export default HeroSection;