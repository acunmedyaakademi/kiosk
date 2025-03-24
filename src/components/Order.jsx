import { useRef, useState } from "react";
import "../styles/Order.css"

export default function Order({ total, setSelectedProduct, setIsCancel, isCancel, selectedProduct }) {
  const [isOnClick, setIsOnClick] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const dialogRef = useRef(null)


  const handleClick = () => {
    setIsOnClick(true);
    setTimeout(() => {
      setIsOnClick(false);
      setIsValidate(true);

      setTimeout(() => {
        setIsValidate(false);
        setSelectedProduct([]);
        
      }, 1250);
    }, 2250);
  }

  function handleDelete(x) {
    const filteredProduct = selectedProduct.filter(y => y.id !== x);
    setSelectedProduct(filteredProduct)
  }

  function kioskSystem() {
    const currentOrderNumber = localStorage.getItem('lastOrderNumber') || 0;
    const newOrderNumber = parseInt(currentOrderNumber) + 1;
    const formattedOrderNumber = `S${String(newOrderNumber).padStart(4, '0')}`;
    setOrderNumber(formattedOrderNumber);
    localStorage.setItem('lastOrderNumber', newOrderNumber);

  }
  return (
    <>
      <div className="basket">
        <div className="remove-btn">
          <button onClick={() => setSelectedProduct([])}>Cancel</button>
          <div className="border-bottom"></div>
        </div>
        <div className="order">
          <h4>Your Order</h4>
          <span>{selectedProduct.length}</span>
          <span>{total} ₺</span>
        </div>
        <button onClick={() => {kioskSystem(); dialogRef.current.showModal()}}>Go to cart</button>

      </div>



      <dialog ref={dialogRef} className="payment-dialog">
        <div className="order-number">
          <h6>{orderNumber}</h6>
          <div class="arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="dialog-order">
          <ul className="card-items">
            {selectedProduct.map((x, i) =>
              <li key={i} className="card-item">
                <div className="product-info">
                  <span className="item-name">{x.name}</span>
                  <div>
                    <span className="item-piece">{x.count}x</span>
                    <span className="item-price">${x.price}</span>
                    <span className="item-total">${(x.count * x.price).toFixed(2)}</span>
                  </div>
                </div>
                <button className="dialog-remove-btn" onClick={() => handleDelete(x.id)}><i className="fa-solid fa-xmark"></i></button>
              </li>
            )}
          </ul>
          <div className="order-total">
            <h6>Order Total</h6>
            <span>{total} ₺</span>
          </div>
          <div className="delivery-note">
            <img src="./public/assets/img/carbon-neutral-icon.svg" alt="" />
            <p>This is a <strong>carbon-neutral</strong> delivery</p>
          </div>
          <div className="confirm-btn">
            <button className={`${isOnClick ? 'onclic' : ''} ${isValidate ? 'validate' : ''}`} onClick={handleClick}></button>
          </div>
          <button className="cancel-btn" onClick={() => { setSelectedProduct([]) }}>Cancel</button>
        </div>
      </dialog>
    </>

  )
}