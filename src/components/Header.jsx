import "../styles/Header.css"


export default function Header() {


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
        <button className="carousel__face ">
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
        <button className="carousel__face ">
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
      <div className="slider">
        <div className="border-top-group">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="slide-track">
          <div className="slide">
            <img src="./public/assets/img/hamburger.jpg" alt="" />
          </div>
          <div className="slide">
            <img src="./public/assets/img/hamburger-2.jpg" style={{height:"200px", width:'250px'}}  alt="" />
          </div>
          <div className="slide">
            <img src="./public/assets/img/hamburger-3.jpg" style={{height:"200px", width:'250px'}} alt="" />
          </div>
          <div className="slide">
            <img src="./public/assets/img/hamburger-4.jpg" style={{height:"200px", width:'250px'}} alt="" />
          </div>
          <div className="slide">
            <img src="./public/assets/img/pizza-1.jpg"style={{height:"200px", width:'250px'}} alt="" />
          </div>
          <div className="slide">
            <img src="./public/assets/img/pizza-2.jpg"style={{height:"200px", width:'250px'}} alt="" />
          </div>
          <div className="slide">
            <img src="./public/assets/img/pizza-3.jpg"style={{height:"200px", width:'250px'}} alt="" />
          </div>
          <div className="slide">
            <img src="./public/assets/img/hamburger.jpg" alt="" />
          </div>
          <div className="slide">
            <img src="./public/assets/img/hamburger-2.jpg" style={{height:"200px", width:'250px'}}  alt="" />
          </div>
          <div className="slide">
            <img src="./public/assets/img/hamburger-3.jpg" style={{height:"200px", width:'250px'}} alt="" />
          </div>
          <div className="slide">
            <img src="./public/assets/img/hamburger-4.jpg" style={{height:"200px", width:'250px'}} alt="" />
          </div>
          <div className="slide">
            <img src="./public/assets/img/pizza-1.jpg"style={{height:"200px", width:'250px'}} alt="" />
          </div>
          <div className="slide">
            <img src="./public/assets/img/pizza-2.jpg"style={{height:"200px", width:'250px'}} alt="" />
          </div>
          <div className="slide">
            <img src="./public/assets/img/pizza-3.jpg"style={{height:"200px", width:'250px'}} alt="" />
          </div>
        </div>
      </div>
    </header>
  )
}