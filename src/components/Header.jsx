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
      <div class="slider">
        <div class="slide-track">
          <div class="slide">
            <img src="./public/assets/img/hamburger.jpg"   alt="" />
          </div>
          <div class="slide">
            <img src="./public/assets/img/hamburger.jpg"   alt="" />
          </div>
          <div class="slide">
            <img src="./public/assets/img/hamburger.jpg"   alt="" />
          </div>
          <div class="slide">
            <img src="./public/assets/img/hamburger.jpg"   alt="" />
          </div>
          <div class="slide">
            <img src="./public/assets/img/hamburger.jpg"   alt="" />
          </div>
          <div class="slide">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png"   alt="" />
          </div>
          <div class="slide">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png"   alt="" />
          </div>
          <div class="slide">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png"   alt="" />
          </div>
          <div class="slide">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png"   alt="" />
          </div>
          <div class="slide">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png"   alt="" />
          </div>
          <div class="slide">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png"   alt="" />
          </div>
          <div class="slide">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png"   alt="" />
          </div>
          <div class="slide">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png"   alt="" />
          </div>
          <div class="slide">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png"   alt="" />
          </div>
        </div>
      </div>
    </header>
  )
}