
import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import "./HeroSection.css";

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
                src="https://dworakpeck.usc.edu/sites/default/files/2018-08/human_traff_square.jpg"
                alt="image 1"
                className="h-full w-full object-cover"
              />
      </div>
      <div className="rounded-xl h-[50vh]">
      <img
                src="https://www.fbi.gov/image-repository/stop-human-trafficking-color.jpg/@@images/image/large"
                alt="image 2"
                className="h-full w-full object-cover"
              />
      </div>
      <div className="rounded-xl h-[50vh]">
      <img
                src="https://av-eks-lekhak.s3.amazonaws.com/media/__sized__/article_images/image_jAUGm1e-thumbnail_webp-600x300.webp"
                alt="image 3"
                className="h-full w-full object-cover"
              />
      </div>
      <div className="rounded-xl h-[50vh]">
      <img
                src="https://images.cnbctv18.com/wp-content/uploads/2021/02/sexual-harassment-1000x573.jpg?im=FitAndFill,width=200,height=200"
                alt="image 4"
                className="h-full w-full object-cover"
              />
      </div>
   
    </Slider>
    </section>
  );
}

export default HeroSection;