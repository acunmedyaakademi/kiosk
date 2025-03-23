import Slider from "react-slick";
import Carosel from "./Carosel";
import "../styles/Header.css";

export default function Header() {
  return (
    <>
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

    <Carosel/>
    </header>
   </>
  );
}
