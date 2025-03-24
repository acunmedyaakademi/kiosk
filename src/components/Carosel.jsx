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
    autoplaySpeed: 3000, 
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
          <div>
            <img src="/assets/img/hamburger.jpg"/>
          </div>
          <div>
            <img src="/assets/img/hamburger-1.jpeg"/>
          </div>
          <div>
            <img src="/assets/img/recep-ivedik.jpg"/>
          </div>
          <div>
            <img src="/assets/img/kahve-1.jpg"/>
          </div>
          <div>
            <img src="/assets/img/pizza-1.jpg"/>
          </div>
          <div>
            <img src="/assets/img/pizza-2.jpg"/>
          </div>
          <div>
            <img src="/assets/img/pizza-3.jpeg"/>
          </div>
      </Slider>
    </div>
  );
}
