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
    console.log(selectedProduct);

  }

  function openDialog() {
    dialogRef.current.show();
  }



  return (
    <>
      <h2>All Items</h2>
      <div className="products-area">
        {products.map(x => (
          <div className="product">
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
          <h2>Selected Items</h2>
          {selectedProduct.map(x => (
            <>
              <img src={x.img} alt="" className="auto" />
              <div className="order-sidebar">
                <img src={x.img} alt="" />
                <p>{x.name} - {x.count} adet</p>
                <span>{x.price * x.count} ₺</span>
              </div>
            </>
          ))}
        </div>
      </dialog>
    </>
  )
}