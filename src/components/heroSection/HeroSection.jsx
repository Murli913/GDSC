import { Typography } from '@material-tailwind/react'
import React, { useContext } from 'react'
import myContext from '../../context/data/myContext';
import ImageSlider from '../../ImageSlider';


function HeroSection() {
    const context = useContext(myContext);
    const { mode } = context;
    const slides = [
      { url: "https://www.shutterstock.com/image-photo/children-violence-abused-concept-stop-600nw-2199536599.jpg", title: "beach" },
      { url: "https://www.fbi.gov/image-repository/stop-human-trafficking-color.jpg/@@images/image/large", title: "boat" },
      { url: "https://av-eks-lekhak.s3.amazonaws.com/media/__sized__/article_images/image_jAUGm1e-thumbnail_webp-600x300.webp", title: "forest" },
      { url: "https://www.coe.int/documents/365513/154925056/0/8a620eee-5295-9be8-aa72-c873ac50675c", title: "city" },
      { url: "https://images.cnbctv18.com/wp-content/uploads/2021/02/sexual-harassment-1000x573.jpg?im=FitAndFill,width=1200,height=900", title: "italy" },
    ];
    const containerStyles = {
      width: "500px",
      height: "280px",
      margin: "0 auto",
    };
    return (
        <section
            style={{ background: mode === 'dark' ? 'rgb(30, 41, 59)' : '#30336b' }}>

            {/* Hero Section  */}
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                {/* Main Content  */}
                <main>
                    <div className="text-center">
                        <div className="mb-2">
                            {/* Image  */}
                            <div style={containerStyles}>
                            <ImageSlider slides={slides} parentWidth={500} />
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </section>
    )
}

export default HeroSection