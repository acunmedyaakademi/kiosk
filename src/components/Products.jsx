import { useEffect, useRef, useState } from "react"
import supabase from "../js/supabaseClient"
import "../styles/Products.css"
import Order from "./Order";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [cart, setCart] = useState(null)
  const [isCancel, setIsCancel] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    async function getData() {
      let { data, error } = await supabase.from('products').select('*');
      if (error !== null) {
        console.log(error.message)
        return
      }
      setProducts(data);
    }
    const channels = supabase.channel('insert').on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'products' },
      payload => {
        setProducts(prev => [...prev, payload.new]);
      }
    )
      .subscribe();

    getData();

    return () => supabase.removeChannel(channels);

  }, [])

  function addToCart() {
    if (selectedProduct.find(x => x.id === cart.id)) {
      setSelectedProduct([...selectedProduct]);
    } else {
      setSelectedProduct([...selectedProduct, { ...cart }])
    }
    console.log(selectedProduct);
    handleCloseDialog();
    setIsCancel(true)
  }


  function handleProduct(product) {
    if (cart && cart.id === product.id) {
      setCart(prev => ({ ...prev, count: prev.count + 1 }));
    } else {
      setCart({ ...product, count: 1 });
    }
    openDialog()
    setIsCancel(false);
  }

  function handleMinus(product) {
    if (product.count > 1) {
      product.count--;
      setSelectedProduct([...selectedProduct]);
    } else {
      setSelectedProduct(selectedProduct.filter(x => x.id !== product.id));
      if (product.count === 1) {
        dialogRef.current.close();
      }
    }
  }

  function openDialog() {
    dialogRef.current.show();
  }

  function handleCloseDialog() {
    isPriceNull();
    dialogRef.current.close();
  }

  const total = selectedProduct.reduce((acc, x) => acc + x.price * x.count, 0);

  function isPriceNull() {
    if (total === 0) {
      setIsCancel(false);
    } else {
      setIsCancel(true);
    }
  }





  return (
    <>
      <h2>All Items</h2>
      <div className="products-area">
        {products.map(x => (
          <div className="product" key={x.id}>
            <img src={x.img} />
            <div>
              <h6>{x.name}</h6>
              <span>{x.price} ₺</span>
              <div>
                <button onClick={() => handleProduct(x)}>+ Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <dialog ref={dialogRef} className="order-dialog">
        <div className="relative">
          <button className="close-btn" onClick={() => { handleCloseDialog(); isPriceNull(); }}><i className="fa-solid fa-xmark" ></i></button>
          {cart && (
            <div className="order-container">
              <img src={cart.img} alt="" className="auto" style={{ width: "400px", height: '400px' }} />
              <div>
                <h6>{cart.name}</h6>
                <span>{cart.price} ₺</span>
                <div className="count-btns">
                  <button onClick={() => handleMinus(cart)} disabled={cart.count === 1}><i className="fa-solid fa-minus"></i></button>
                  <span>{cart.count}</span>
                  <button onClick={() => setCart(prev => ({ ...prev, count: prev.count + 1 }))}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
              <AnimetedButton />
            </div>
          )}
        </div>
      </dialog>

      {isCancel && total > 0 && <Order total={total} isCancel={isCancel} setIsCancel={setIsCancel} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />}

    </>
  )

  function AnimetedButton() {
    return (
      <div className="buttons">
        <button className="blob-btn" onClick={addToCart}>
          DONE
          <span className="blob-btn__inner">
            <span className="blob-btn__blobs">
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
            </span>
          </span>
        </button>
        <br />
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
              <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
            </filter>
          </defs>
        </svg>
      </div>
    )
  }
}