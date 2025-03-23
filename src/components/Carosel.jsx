import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../styles/Carosel.css";

export default function Carosel() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000, 
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
          <div>
            <img src="/assets/img/hamburger.jpg" alt="Hamburger" />
          </div>
          <div>
            <img src="/assets/img/hamburger-4.jpg"alt="Hamburger 2" />
          </div>
          <div>
            <img src="/assets/img/hamburger-4.jpg"alt="Hamburger 3" />
          </div>
          <div>
            <img src="/assets/img/hamburger-4.jpg"alt="Hamburger 4" />
          </div>
          <div>
            <img src="/assets/img/pizza-1.jpg"alt="Pizza 1" />
          </div>
          <div>
            <img src="/assets/img/pizza-2.jpg"alt="Pizza 2" />
          </div>
          <div>
            <img src="/assets/img/pizza-3.jpeg"alt="Pizza 3" />
          </div>
      </Slider>
    </div>
  );
}
