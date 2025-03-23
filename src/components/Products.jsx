import { useEffect, useRef, useState } from "react"
import supabase from "../js/supabaseClient"
import "../styles/Products.css"

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
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




  function handleProduct(product) {
    if (selectedProduct.find(x => x.id === product.id)) {
      selectedProduct.find(x => x.id === product.id).count++
      setSelectedProduct([...selectedProduct]);
    } else {
      setSelectedProduct([...selectedProduct, { ...product, count: 1 }])
    }


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
    console.log(product.count);
  }

  function openDialog() {
    dialogRef.current.show();
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
                <button onClick={() => { handleProduct(x); openDialog(); }}>+ Ekle</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <dialog ref={dialogRef} className="order-dialog">
        <div className="relative">
          <button className="close-btn" onClick={() => dialogRef.current.close()}><i className="fa-solid fa-xmark" ></i></button>
          {selectedProduct.map(x => (
            <div className="order-container" key={x.id}>
              <img src={x.img} alt="" className="auto" style={{ width: "400px", }} />
              <div>
                <h6>{x.name}</h6>
                <span>{x.price} ₺</span>
                <div className="count-btns">
                  <button onClick={() => handleMinus(x)}><i className="fa-solid fa-minus"></i></button>
                  <span>{x.count}</span>
                  <button onClick={() => handleProduct(x)}><i className="fa-solid fa-plus"></i></button>
                </div>
              </div>
              <AnimetedButton />
            </div>
          ))}
        </div>
      </dialog>
    </>
  )

  function AnimetedButton() {
    return (
      <div className="buttons">
        <button className="blob-btn">
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