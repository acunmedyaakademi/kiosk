import Slider from "react-slick";

import "../styles/Header.css";

export default function Header() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <header>
      <div className="category flex">
        <button className="carousel__face active">
          <i className="fa-solid fa-house"></i>
          <span>Main</span>
        </button>
        <button className="carousel__face">
          <i className="fa-solid fa-pizza-slice"></i>
          <span>Pizza</span>
        </button>
        <button className="carousel__face">
          <i className="fa-solid fa-burger"></i>
          <span>Burgers</span>
        </button>
        <button className="carousel__face">
          <i className="fa-solid fa-martini-glass"></i>
          <span>Coctail</span>
        </button>
        <button className="carousel__face">
          <i className="fa-solid fa-ice-cream"></i>
          <span>Ice Cream</span>
        </button>
        <button className="carousel__face">
          <i className="fa-solid fa-mug-hot"></i>
          <span>Coffee</span>
        </button>
        <button className="carousel__face">
          <i className="fa-brands fa-sketch"></i>
          <span>Sauces</span>
        </button>
      </div>
      <div className="keyboard">
        <span className="key">C</span>
        <span className="key">A</span>
        <span className="key">M</span>
        <span className="key">P</span>
        <span className="key">A</span>
        <span className="key">I</span>
        <span className="key">G</span>
        <span className="key">N</span>
      </div>
      <Slider {...settings}>
        <div className="slider">
          <div className="slide">
            <img src="/assets/img/hamburger.jpg" alt="Hamburger" />
          </div>
          <div className="slide">
            <img src="/assets/img/hamburger-2.jpg" style={{ height: "200px", width: "250px" }} alt="Hamburger 2" />
          </div>
          <div className="slide">
            <img src="/assets/img/hamburger-3.jpg" style={{ height: "200px", width: "250px" }} alt="Hamburger 3" />
          </div>
          <div className="slide">
            <img src="/assets/img/hamburger-4.jpg" style={{ height: "200px", width: "250px" }} alt="Hamburger 4" />
          </div>
          <div className="slide">
            <img src="/assets/img/pizza-1.jpg" style={{ height: "200px", width: "250px" }} alt="Pizza 1" />
          </div>
          <div className="slide">
            <img src="/assets/img/pizza-2.jpg" style={{ height: "200px", width: "250px" }} alt="Pizza 2" />
          </div>
          <div className="slide">
            <img src="/assets/img/pizza-3.jpg" style={{ height: "200px", width: "250px" }} alt="Pizza 3" />
          </div>
        </div>
      </Slider>
    </header>
  );
}
