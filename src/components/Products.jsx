import { useEffect, useRef, useState } from "react"
import supabase from "../js/supabaseClient"
import "../styles/Products.css"
import Order from "./Order";
import { motion } from "motion/react"

export default function Products({ filterCategory }) {
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
      const bug = selectedProduct.find(x => x.id === cart.id)
      bug.count += cart.count
      setSelectedProduct([...selectedProduct]);
    } else {
      setSelectedProduct([...selectedProduct, { ...cart }])
    }
    handleCloseDialog();
    setCart(null)
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

  const filtered = filterCategory.id === undefined ? 8 : filterCategory.id;
  // const filtered = filterCategory.id === "" ? null : filterCategory.id || 8;
  console.log("Filtered ID:", filtered);

  return (
    <>
      <h2>Ürünler</h2>
      <motion.div className="products-area"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {products
          .filter(x => filtered === 8 || x.category_id === Number(filtered))
          .map((x, index) => (
            <motion.div
              className="product"
              key={x.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, }}
            >
              <img src={x.img} />
              <div>
                <h6>{x.name}</h6>
                <span>{x.price} ₺</span>
                <div>
                  <button onClick={() => handleProduct(x)}>+ Ekle</button>
                </div>
              </div>
            </motion.div>
          ))}
      </motion.div>
      <dialog ref={dialogRef} className="order-dialog">
        <div className="relative">
          <button className="close-btn" onClick={() => { handleCloseDialog(); isPriceNull(); setCart(null) }}><i className="fa-solid fa-xmark" ></i></button>
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
          Ekle
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