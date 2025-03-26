import { useRef, useState } from "react";
import "../styles/Order.css"
import supabase from "../js/supabaseClient.js";
import Receipt from "./Receipt.jsx";

export default function Order({ total, setSelectedProduct, setIsCancel, isCancel, selectedProduct }) {
  const [isOnClick, setIsOnClick] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const dialogRef = useRef(null)


  const handleClick = async () => {
    setIsOnClick(true);

      const { data } = await supabase.from('orders').insert([{paid_price: total,status_id: 1,created_at: new Date().toISOString()}]).select();  

      const newOrderId = data[0].id;
      const orderItems = selectedProduct.map(product => ({order_id: newOrderId,product_id: product.id,created_at: new Date().toISOString()}));
  
      const { error: detailError } = await supabase.from('order_details').insert(orderItems);
      if (detailError) throw detailError;
  
      setTimeout(() => {
        setIsOnClick(false);
        setIsValidate(true);
        setTimeout(() => {
          setIsValidate(false);
          setSelectedProduct([]);
          dialogRef.current.close();
        }, 1250);
      }, 2250);
  };




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
          <button onClick={() => setSelectedProduct([])}>İptal</button>
          <div className="border-bottom"></div>
        </div>
        <div className="order">
          <h4>Siparişlerin</h4>
          <span>{selectedProduct.length}</span>
          <span>{total} ₺</span>
        </div>
        <button onClick={() => { kioskSystem(); dialogRef.current.showModal() }}>Karta git</button>

      </div>



      <dialog ref={dialogRef} className="payment-dialog">
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
            <h6>Toplam Sipariş Tutarı:</h6>
            <span>{total} ₺</span>
          </div>
          <div className="delivery-note">
            <img src="/assets/img/carbon-neutral-icon.svg" alt="" />
            <p>This is a <strong>carbon-neutral</strong> delivery</p>
          </div>
          <div className="confirm-btn">
            <button className={`${isOnClick ? 'onclic' : ''} ${isValidate ? 'validate' : ''}`} onClick={handleClick}></button>
          </div>
          <button className="cancel-btn" onClick={() => { dialogRef.current.close() }}>Geri</button>
        </div>
      </dialog>
      <Receipt />
    </>

    

  )
}