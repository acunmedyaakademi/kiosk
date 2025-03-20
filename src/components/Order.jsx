import { useState } from "react";
import "../styles/Order.css"

export default function Order() {
  const [isOnClick, setIsOnClick] = useState(false);
  const [isValidate, setIsValidate] = useState(false);

  const handleClick = () => {
    setIsOnClick(true);

    setTimeout(() => {
      setIsOnClick(false);
      setIsValidate(true);

      setTimeout(() => {
        setIsValidate(false);
      }, 1250);
    }, 2250);
  }
  return (
    <div className="basket">
      <h2>Siparişim</h2>
      {/* <div className="empty-basket">
        <img src="./public/assets/img/empty-list.png" alt="" />
        <p>Eklediğiniz ürünler burada görünücek</p>
      </div> */}
      <div className="order">
        <ul className="card-items">
          <li  className="card-item">
            <div className="product-info">
              <span className="item-name">Big Mac</span>
              <div>
                <span className="item-piece">2x</span>
                <span className="item-price">$10.5</span>
                <span className="item-total">$21</span>
              </div>
            </div>
            <button className="remove-btn"><i className="fa-solid fa-xmark"></i></button>
          </li>
        </ul>
        <div className="order-total">
          <h6>Toplam</h6>
          <span>$41.00</span>
        </div>
        <div className="confirm-btn">
          <button className={`${isOnClick ? 'onclic' : ''} ${isValidate ? 'validate' : ''}`} onClick={handleClick}></button>
        </div>

      </div>

    </div>
  )
}