import { useState } from "react";
import "../styles/Order.css"

export default function Order({ total, setIsCancel, isCancel }) {
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
      <div className="remove-btn">
        <button>Cancel</button>
        <div className="border-bottom"></div>
      </div>
      <div className="order">
        <h4>Your Order</h4>
        <span>3</span>
        <span>{total}</span>
      </div>
      <div className="confirm-btn">
        <button className={`${isOnClick ? 'onclic' : ''} ${isValidate ? 'validate' : ''}`} onClick={handleClick}></button>
      </div>
    </div>
  )
}