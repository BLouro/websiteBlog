import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from "../content/config.json";


const getSliderSettings = () => ({
  infinite: true,
  slidesToShow: 6,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  dots: false,
  arrows: false,
  draggable: true,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,  
      settings: {
        slidesToShow: 6, 
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
});

const TechCarousels: React.FC = () => {

  const techStack = data.techStack;

  return (
    <div className="w-11/12 mx-auto dark:text-white">
      <h3 className="bg-slate-800 dark:bg-slate-100 bg-clip-text text-2xl font-extrabold text-transparent text-center">
        Check the tools I'm using:
      </h3>
      {techStack.map((category) => (
        <div key={category.title} className="mt-3">
          <h2 className="text-xl font-semibold text-center mb-5">{category.title}</h2>
          <Slider {...getSliderSettings()}>
            {category.technologies.map((tech, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <img src={tech.logo} alt={tech.name} className="mx-auto w-14 h-14 transition-transform duration-300" />
                <p className="text-sm font-medium mt-2 ">{tech.name}</p>
              </div>
            ))}
          </Slider>
          <hr className="m-3  h-0.5 border-t-0 bg-neutral-300 dark:bg-white/10" />
        </div>    
      ))}
    </div>
  );
};

export default TechCarousels;