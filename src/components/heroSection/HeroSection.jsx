import { Carousel } from "@material-tailwind/react";
import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import "./HeroSection.css";
function HeroSection() {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <section style={{ background: mode === 'dark' ? 'rgb(30, 41, 59)' : '#30336b' }}>
      {/* Hero Section  */}
      <div className="mx-auto flex items-center justify-center flex-col">
        {/* Main Content  */}
        <main>
          <div className="text-center">
            <Carousel
              transition={{ duration: 0.5 }}
              autoplay
              className="rounded-xl h-[50vh]"
            >
              <img
                src="https://dworakpeck.usc.edu/sites/default/files/2018-08/human_traff_square.jpg"
                alt="image 1"
                className="h-full w-full object-cover"
              />
              <img
                src="https://www.fbi.gov/image-repository/stop-human-trafficking-color.jpg/@@images/image/large"
                alt="image 2"
                className="h-full w-full object-cover"
              />
              <img
                src="https://av-eks-lekhak.s3.amazonaws.com/media/__sized__/article_images/image_jAUGm1e-thumbnail_webp-600x300.webp"
                alt="image 3"
                className="h-full w-full object-cover"
              />
              <img
                src="https://images.cnbctv18.com/wp-content/uploads/2021/02/sexual-harassment-1000x573.jpg?im=FitAndFill,width=200,height=200"
                alt="image 4"
                className="h-full w-full object-cover"
              />
            </Carousel>
          </div>
        </main>
      </div>
    </section>
  );
}

export default HeroSection;