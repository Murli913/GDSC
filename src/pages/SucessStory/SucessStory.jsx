import React, { useContext, useState, useEffect } from "react";
import myContext from "../../context/data/myContext";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SucessStory = () => {
  const context = useContext(myContext);
  const { mode, getAllstory } = context;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === getAllstory.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    // Clear the interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, [getAllstory.length]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    draggable: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  return (
    <div className="sticky top-12 z-50">
      <div className="py-10 mx-auto max-w-7xl">
        <div className="mb-4 flex justify-center">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Success Stories</h1>

        </div>
        <div className="carousel-container" style={{ height: "30vh" }}>
          <Slider {...settings}>
            {getAllstory.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/sucessinfo/${item.id}`)}
                className="p-2 md:w-1/1"
              >
                <div
                  style={{
                    background: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                    borderBottom:
                      mode === "dark"
                        ? " 4px solid rgb(226, 232, 240)"
                        : " 4px solid rgb(30, 41, 59)",
                  }}
                  className={`h-full shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
               ${mode === "dark" ? "shadow-gray-700" : "shadow-xl"} 
               rounded-xl overflow-hidden`}
                >
                  <img className="w-full" src={item.thumbnail} alt="blog" />
                  <div className="p-2">
                    <h2
                      className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                      style={{
                        color:
                          mode === "dark"
                            ? "rgb(226, 232, 240)"
                            : " rgb(30, 41, 59)",
                      }}
                    >
                      {item.date}
                    </h2>
                    <h1
                      className="title-font text-lg font-bold text-gray-900 mb-3"
                      style={{
                        color:
                          mode === "dark"
                            ? "rgb(226, 232, 240)"
                            : " rgb(30, 41, 59)",
                      }}
                    >
                      {item.blogs.title}
                    </h1>
                    <p
                      className="leading-relaxed mb-3"
                      style={{
                        color:
                          mode === "dark"
                            ? "rgb(226, 232, 240)"
                            : " rgb(30, 41, 59)",
                      }}
                    >
                      Photo booth fam kinfolk cold-pressed sriracha leggings
                      jianbing microdosing tousled waistcoat.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SucessStory;