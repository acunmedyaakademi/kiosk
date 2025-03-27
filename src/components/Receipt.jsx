import "../styles/Receipt.css";

export default function Receipt({newOrderId}) {
  return(
    <div className="receipt-area">
      <img src="./assets/img/enjoy-food.gif" alt="enjoy food image" />
      <h2>Siparişiniz Hazırlanıyor... <br /> Lütfen Bekleyiniz</h2>
      <div className="order-number">
        <h5>Fiş Numarası: RN{newOrderId}  </h5>
        <div className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}